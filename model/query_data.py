import sys
import argparse
# from dataclasses import dataclass
from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_ollama import ChatOllama
from langchain.prompts import ChatPromptTemplate
import re


CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
Your task is to provide a clear, respectful, and easy-to-understand answer to the user's question using the context provided. Prioritize accuracy and empathy. Always base your answer on the given context, drawing from it as much as possible. Only use general medical knowledge when the context is insufficient, and never invent specific details.

Speak in a confident tone that shows clarity and care, but remain open to uncertainty when necessary. If an answer depends on individual differences or missing information, say so honestly—this builds trust. Do not refer to the documents or to yourself as an AI.

Use everyday language that someone without a medical background can understand. Avoid jargon. Break up complex ideas into shorter sentences or bullet points if needed.

At the end of each response, include a brief section titled **“What You Can Do Next”**. This should include:
- One or more simple steps the user can take based on the answer.
- A strong suggestion to talk to their healthcare provider about the topic.

Here is the context you must work with:

{context}

---

Now, answer the following question with clarity, kindness, and confidence, using the context above:  
**{question}**
"""


def main():
    # Create CLI.
    query = sys.argv[1]
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text
    # Prepare the DB.
    embedding_function = OllamaEmbeddings(model='llama3')
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB.
    results = db.similarity_search_with_relevance_scores(query_text, k=3)
    if len(results) == 0:
        print("No results")
    elif results[0][1] < 0.2:
        print(f"Unable to find matching results.")
        return

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    model = ChatOllama(model="llama3")
    response_text = model.invoke(prompt)
    sources = [doc.metadata.get("source", "") for doc, _ in results]
    response_string = str(response_text)
    match = re.search(r'content="([^"]+)"', response_string)
    if match:
        response_string = match.group(1)

    # Replace newlines with <br/> for proper line breaks in the browser
    response_string = response_string.replace("\\n", "<br/>")

    # Format sources as a bulleted list or just comma-separated
    # Example: Create a bullet list of sources if you prefer
    if sources:
        sources_list = "<ul>" + "".join(f"<li>{src}</li>" for src in sources if src) + "</ul>"
        final_output = f"{response_string}<br/><b>Sources:</b><br/>{sources_list}"
    else:
        final_output = response_string

    print(final_output)



if __name__ == "__main__":
    main()

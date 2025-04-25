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

You are working with results derived from a specialized model that identifies key latent factors from multimodal health data. These factors are grouped into three domains:
- **Upper**: Brain biomarkers, cognitive health, sleep quality, and education level.
- **Middle**: Cardiovascular health indicators.
- **Lower**: Lifestyle factors, including smoking, physical activity, activity cycles, and alcohol use.

The results uploaded will be marked with the domain that the user is querying from, only respond with that domain.

All results are between 0-100, with 0 being the worst risk and 100 being perfect.

If needed, briefly explain that the results reflect patterns across these domains, rather than isolated measurements. Highlight that the results show relationships, not certainties, and that individual experiences may vary.

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
    # Create CLI with two positional args: the user’s query + the serialized results blob
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text",   type=str, help="The query text.")
    parser.add_argument("real_results", type=str, help="The serialized results context.")
    args = parser.parse_args()
    query_text   = args.query_text
    real_results = args.real_results
    # Prepare the DB.
    embedding_function = OllamaEmbeddings(model='llama3')
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB.
    results = db.similarity_search_with_relevance_scores(query_text, k=2)
    if len(results) == 0:
        print("No results")
    elif results[0][1] < 0.2:
        print(f"Unable to find matching results.")
        return

    db_context   = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    full_context = f"{real_results}\n\n---\n\n{db_context}"

    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(
        context = full_context,
        question = query_text
    )

    model     = ChatOllama(model="llama3")
    raw_out   = model.invoke(prompt)
    sources   = [doc.metadata.get("source", "") for doc, _ in results]

    # 1) Unwrap the raw_out into a single Python string
    if hasattr(raw_out, "content"):
        # LangChain BaseMessage (e.g. you passed in BaseMessages)
        response_string = raw_out.content

    elif isinstance(raw_out, list):
        # Ollama often returns a list of dicts or strings
        first = raw_out[0] if raw_out else ""
        if isinstance(first, str):
            response_string = first
        elif isinstance(first, dict):
            # pick the first sensible text key
            response_string = (
                first.get("response")
                or first.get("content")
                or next((v for v in first.values() if isinstance(v, str)), "")
            )
        else:
            response_string = str(first)

    else:
        # last-ditch fallback
        response_string = str(raw_out)

    # 2) Turn real newlines into HTML breaks
    response_string = response_string.replace("\n", "<br/>")

    # 3) Now build your final output exactly as before
    if sources:
        sources_list = "<ul>" + "".join(f"<li>{s}</li>" for s in sources if s) + "</ul>"
        final_output = f"{response_string}<br/><b>Sources:</b><br/>{sources_list}"
    else:
        final_output = response_string

    print(final_output)



if __name__ == "__main__":
    main()

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import subprocess
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/messages")
async def handle_messages(request: Request):
    data = await request.json()
    current_message   = data.get("currentMessage", {})
    real_results      = data.get("results", "")
    user_query        = current_message.get("chatContent", "")

    # only put real_results on the CLI once
    cmd = ["python", "model/query_data.py", user_query]
    if real_results:
        cmd.append(real_results)

    result = subprocess.run(cmd, capture_output=True, text=True)

    # for debugging, log the stderr
    if result.returncode != 0:
        # you can log result.stderr or even return it in dev
        return JSONResponse(
            status_code=500,
            content={"error": "Script failed", "details": result.stderr.strip()}
        )

    response_text = result.stdout.strip()
    return {"response": response_text}

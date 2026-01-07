FROM python:3.11-slim

WORKDIR /app

COPY flashcardsfinal.py .

RUN pip install --no-cache-dir google-genai langchain_text_splitters dotenv

CMD ["python", "flashcardsfinal.py"]

#!/usr/bin/env python
# coding: utf-8



from langchain_text_splitters import RecursiveCharacterTextSplitter



import os
from dotenv import load_dotenv

# Set environment variable (do this once per session)
# Load environment variables from a .env file
load_dotenv()

# Retrieve the API key from the environment variables
os.environ['GOOGLE_API_KEY'] = os.getenv("GEMINI_API_KEY")


sample_doc = """Neurons and the Nervous System 1. Nervous System Overview Definition: The nervous system is the network of cells and fibers that transmits signals between parts of the body. Main Divisions: Central Nervous System (CNS): Brain and spinal cord Peripheral Nervous System (PNS): Nerves outside the CNS 2. Neuron Structure Neuron: Basic functional unit of the nervous system; a nerve cell that transmits information. Parts of a Neuron: Cell Body (Soma): Contains the nucleus and organelles; processes signals. Dendrites: Branch-like structures that receive messages from other neurons. Axon: Long fiber that transmits signals to other neurons or muscles. Myelin Sheath: Fatty layer covering the axon that speeds up signal transmission. Axon Terminals: Endpoints that release neurotransmitters to communicate with other cells. 3. Types of Neurons Sensory Neurons: Carry signals from sensory organs to the CNS. Motor Neurons: Transmit signals from the CNS to muscles or glands. Interneurons: Connect neurons within the CNS for processing information. 4. How Neurons Communicate Electrical Signals: Action Potential: A rapid change in voltage across the neuron's membrane that transmits a signal along the axon. Chemical Signals: Neurotransmitters: Chemicals released at synapses to transmit signals to the next neuron. Synapse: Junction between two neurons where neurotransmitters are released. 5. Reflex Arc Definition: A simple neural pathway that controls reflex actions. Pathway: Sensory neuron detects stimulus Signal passes to interneuron in spinal cord Interneuron triggers motor neuron Motor neuron activates muscle 6. Common Disorders Multiple Sclerosis (MS): Damage to myelin sheath leading to slow signal transmission. Parkinson’s Disease: Loss of dopamine-producing neurons affecting movement. Alzheimer’s Disease: Degeneration of neurons causing memory loss."""
print(f"Length: {len(sample_doc)} characters\n")
print(sample_doc)




text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=150,
    chunk_overlap=30,
    length_function=len,
    add_start_index=True,
    separators=["\n\n", "\n", ". ", " ", ""] 
)

raw_chunks = text_splitter.split_text(sample_doc)
chunks = [chunk.replace('\n', ' ').strip() for chunk in raw_chunks]




from google import genai
import time

client = genai.Client()
flashcards = []

for i, chunk in enumerate(raw_chunks):

    prompt = f"""Based on this content, create 1-3 flashcards about the given chunk.
Return ONLY a JSON array. No other text. Format:
[
  {{"question": "...", "answer": "..."}},
  {{"question": "...", "answer": "..."}}
]

Content:
{chunk}
"""
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt
    )
    flashcards.append(response.text)




import json
import re
from dotenv import load_dotenv

# -------------------------------
# 1️⃣ Raw input (your data)
# -------------------------------
raw_data = flashcards

# -------------------------------
# 2️⃣ Helper functions
# -------------------------------

def strip_code_fences(text: str) -> str:
    """Remove markdown code fences (```json and ```)"""
    text = re.sub(r"```json", "", text)
    text = re.sub(r"```", "", text)
    return text.strip()

def parse_json_safely(text: str):
    """Safely parse JSON string, return empty list if invalid"""
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        print("Warning: Skipping invalid JSON:", text[:50], "...")
        return []

# -------------------------------
# 3️⃣ Process raw data into nested hashmap
# -------------------------------

nested_hashmap = {}

for entry in raw_data:
    cleaned = strip_code_fences(entry)
    parsed = parse_json_safely(cleaned)

    for item in parsed:
        question = item.get("question")
        answer = item.get("answer")

        if question and answer:
            # Deduplicate automatically: latest one will overwrite
            nested_hashmap[question] = {"answer": answer}

# -------------------------------
# 5️⃣ Output for verification
# -------------------------------
print(json.dumps(nested_hashmap, indent=2, ensure_ascii=False))

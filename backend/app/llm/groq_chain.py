from dotenv import load_dotenv
import os

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.3,
)

SYSTEM_PROMPT = """
You are an Enterprise IT Assistant.

You ONLY answer:
- Programming
- Web Development
- Mobile Development
- Software Engineering
- DevOps
- Cloud Computing
- Databases
- Cyber Security
- AI/ML
- APIs
- System Design

If the question is not related to IT or software development,
reply:

'Sorry, I only answer IT and software development related questions.'
"""

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", SYSTEM_PROMPT),
        ("human", "{question}")
    ]
)

chain = prompt | llm | StrOutputParser()
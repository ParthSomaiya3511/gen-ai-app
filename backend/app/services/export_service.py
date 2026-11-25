from docx import Document

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph
)

def export_docx(chats):

    doc = Document()

    doc.add_heading(
        "AI Assistant Chat Export",
        0
    )

    for chat in chats:

        doc.add_paragraph(
            f"Q: {chat['question']}"
        )

        doc.add_paragraph(
            f"A: {chat['answer']}"
        )

    path = "exports/chat.docx"

    doc.save(path)

    return path




def export_pdf(chats):

    pdf = SimpleDocTemplate(
        "exports/chat.pdf"
    )

    elements = []

    for chat in chats:

        elements.append(
            Paragraph(
                f"Q: {chat['question']}"
            )
        )

        elements.append(
            Paragraph(
                f"A: {chat['answer']}"
            )
        )

    pdf.build(elements)

    return "exports/chat.pdf"
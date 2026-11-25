from fastapi import APIRouter

router = APIRouter()

@router.get("/export/pdf")
async def export_pdf_file():

    return {
        "file":
        "exports/chat.pdf"
    }

@router.get("/export/docx")
async def export_docx_file():

    return {
        "file":
        "exports/chat.docx"
    }
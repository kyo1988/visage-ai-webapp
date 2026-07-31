#!/usr/bin/env python3
"""Generate the public EBM audit PDF from the canonical Markdown sections."""

from __future__ import annotations

import html
import re
from pathlib import Path

try:
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_CENTER, TA_LEFT
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
    from reportlab.lib.units import mm
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.platypus import (
        BaseDocTemplate,
        Frame,
        NextPageTemplate,
        PageBreak,
        PageTemplate,
        Paragraph,
        Preformatted,
        Spacer,
        Table,
        TableStyle,
    )
except ModuleNotFoundError as exc:
    raise SystemExit(
        "reportlab is required. Run: "
        "python3 -m pip install -r scripts/requirements-whitepaper.txt"
    ) from exc


ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "content" / "whitepaper" / "ebm-2025"
OUTPUT_PATH = ROOT / "public" / "whitepapers" / "ebm-2025-v0.2.pdf"
REPORT_FILES = [
    "01-executive-summary.md",
    "02-what-we-measured.md",
    "03-finding-1-duplication.md",
    "04-finding-2-double-jeopardy.md",
    "05-finding-3-buyer-frequency.md",
    "06-finding-4-cep.md",
    "07-methods.md",
    "08-limits.md",
    "09-reproduction-checklist.md",
    "10-references.md",
    "99-legal.md",
]


def register_fonts() -> tuple[str, str, str]:
    font_candidates = [
        (
            Path("/System/Library/Fonts/Supplemental/Arial.ttf"),
            Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf"),
            Path("/System/Library/Fonts/Supplemental/Arial Italic.ttf"),
        ),
        (
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf"),
        ),
    ]
    for regular, bold, italic in font_candidates:
        if regular.exists() and bold.exists() and italic.exists():
            pdfmetrics.registerFont(TTFont("ReportSans", str(regular)))
            pdfmetrics.registerFont(TTFont("ReportSans-Bold", str(bold)))
            pdfmetrics.registerFont(TTFont("ReportSans-Italic", str(italic)))
            pdfmetrics.registerFontFamily(
                "ReportSans",
                normal="ReportSans",
                bold="ReportSans-Bold",
                italic="ReportSans-Italic",
                boldItalic="ReportSans-Bold",
            )
            return "ReportSans", "ReportSans-Bold", "ReportSans-Italic"
    return "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"


BODY_FONT, BOLD_FONT, ITALIC_FONT = register_fonts()


def pdf_safe(text: str) -> str:
    replacements = {
        "\u2013": "-",
        "\u2014": " - ",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2264": "<=",
        "\u2265": ">=",
        "\u2248": " approx. ",
        "\u00d7": "x",
        "\u2192": "->",
        "\u00b2": "^2",
        "\u207b": "-",
        "\u2076": "6",
        "\u2212": "-",
        "\u00b7": " / ",
        "\u2260": "!=",
    }
    for source, target in replacements.items():
        text = text.replace(source, target)
    return text


def inline_markup(text: str) -> str:
    safe = html.escape(pdf_safe(text), quote=False)
    safe = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r'<link href="\2" color="#1d4ed8">\1</link>', safe)
    safe = re.sub(
        r"`([^`]+)`",
        rf'<font name="{BODY_FONT}" backColor="#eef2f7">\1</font>',
        safe,
    )
    safe = re.sub(r"\*\*([^*]+)\*\*", rf'<font name="{BOLD_FONT}">\1</font>', safe)
    safe = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", rf'<font name="{ITALIC_FONT}">\1</font>', safe)
    safe = re.sub(
        r"(?<![\"'=])(https?://[^\s<]+)",
        r'<link href="\1" color="#1d4ed8">\1</link>',
        safe,
    )
    return safe


styles = getSampleStyleSheet()
BODY = ParagraphStyle(
    "Body",
    parent=styles["BodyText"],
    fontName=BODY_FONT,
    fontSize=8.9,
    leading=12.7,
    textColor=colors.HexColor("#263247"),
    spaceAfter=7,
    splitLongWords=True,
)
H1 = ParagraphStyle(
    "H1",
    parent=styles["Heading1"],
    fontName=BOLD_FONT,
    fontSize=21,
    leading=25,
    textColor=colors.HexColor("#0f172a"),
    spaceBefore=0,
    spaceAfter=14,
)
H2 = ParagraphStyle(
    "H2",
    parent=styles["Heading2"],
    fontName=BOLD_FONT,
    fontSize=13.2,
    leading=15.5,
    textColor=colors.HexColor("#172554"),
    spaceBefore=9,
    spaceAfter=5,
    keepWithNext=True,
)
H3 = ParagraphStyle(
    "H3",
    parent=styles["Heading3"],
    fontName=BOLD_FONT,
    fontSize=10.5,
    leading=14,
    textColor=colors.HexColor("#1e3a8a"),
    spaceBefore=9,
    spaceAfter=4,
    keepWithNext=True,
)
LIST = ParagraphStyle(
    "List",
    parent=BODY,
    leftIndent=14,
    firstLineIndent=-10,
    spaceAfter=3,
)
TABLE_CELL = ParagraphStyle("TableCell", parent=BODY, fontSize=7.2, leading=9.2, spaceAfter=0)
TABLE_HEAD = ParagraphStyle(
    "TableHead",
    parent=TABLE_CELL,
    fontName=BOLD_FONT,
    textColor=colors.HexColor("#172554"),
)
CODE = ParagraphStyle(
    "Code",
    parent=BODY,
    fontName="Courier",
    fontSize=7.2,
    leading=9.5,
    backColor=colors.HexColor("#f1f5f9"),
    borderPadding=7,
    leftIndent=5,
    rightIndent=5,
)


class WhitepaperDocTemplate(BaseDocTemplate):
    def __init__(self, filename: str):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=17 * mm,
            rightMargin=17 * mm,
            topMargin=17 * mm,
            bottomMargin=18 * mm,
            title="Evidence-Based Marketing Playbook v0.2 - Public-data replication audit",
            author="Kyo Harada",
            subject="Marketing science replication audit",
        )
        cover_frame = Frame(
            22 * mm,
            0,
            A4[0] - 44 * mm,
            A4[1],
            id="cover-frame",
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        body_frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            id="body-frame",
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates(
            [
                PageTemplate(id="cover", frames=[cover_frame], onPage=self.draw_cover),
                PageTemplate(id="body", frames=[body_frame], onPage=self.draw_body_chrome),
            ]
        )

    @staticmethod
    def draw_cover(canvas, doc):
        width, height = A4
        canvas.saveState()
        canvas.setFillColor(colors.HexColor("#0f172a"))
        canvas.rect(0, 0, width, height, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#1e3a8a"))
        canvas.circle(width * 0.90, height * 0.12, 85 * mm, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#1e40af"))
        canvas.circle(width * 0.08, height * 0.90, 45 * mm, stroke=0, fill=1)
        canvas.restoreState()

    @staticmethod
    def draw_body_chrome(canvas, doc):
        width, _ = A4
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor("#d9deea"))
        canvas.line(17 * mm, 13 * mm, width - 17 * mm, 13 * mm)
        canvas.setFont(BODY_FONT, 7.5)
        canvas.setFillColor(colors.HexColor("#64748b"))
        canvas.drawString(17 * mm, 8.5 * mm, "Evidence-Based Marketing Playbook / Revised July 2026")
        canvas.drawRightString(width - 17 * mm, 8.5 * mm, str(doc.page - 1))
        canvas.restoreState()


def cover_story():
    title = ParagraphStyle(
        "CoverTitle",
        fontName=BOLD_FONT,
        fontSize=31,
        leading=35,
        textColor=colors.white,
        alignment=TA_LEFT,
        spaceAfter=12,
    )
    subtitle = ParagraphStyle(
        "CoverSubtitle",
        fontName=BODY_FONT,
        fontSize=16,
        leading=21,
        textColor=colors.HexColor("#bfdbfe"),
        spaceAfter=22,
    )
    kicker = ParagraphStyle(
        "CoverKicker",
        fontName=BOLD_FONT,
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#93c5fd"),
        spaceAfter=9,
    )
    stat = ParagraphStyle(
        "CoverStat",
        fontName=BOLD_FONT,
        fontSize=10.5,
        leading=15,
        textColor=colors.white,
        borderColor=colors.HexColor("#475569"),
        borderWidth=0.6,
        borderPadding=8,
        backColor=colors.HexColor("#172554"),
        spaceAfter=7,
    )
    meta = ParagraphStyle(
        "CoverMeta",
        fontName=BODY_FONT,
        fontSize=9,
        leading=14,
        textColor=colors.HexColor("#cbd5e1"),
    )
    return [
        Spacer(1, 38 * mm),
        Paragraph("VERSION 0.2 / REVISED JULY 2026", kicker),
        Paragraph("Evidence-Based<br/>Marketing Playbook", title),
        Paragraph("A public-data replication audit of Ehrenberg-Bass regularities", subtitle),
        Spacer(1, 38 * mm),
        Paragraph("Five claims from version 0.1 are withdrawn after a code audit.", stat),
        Spacer(1, 35 * mm),
        Paragraph(
            "Kyo Harada<br/>Original analysis: September 2025<br/>Revised public edition: July 2026",
            meta,
        ),
        NextPageTemplate("body"),
        PageBreak(),
    ]


def revision_notice_story():
    cover_markdown = (CONTENT_DIR / "00-cover.md").read_text(encoding="utf-8")
    quoted_lines: list[str] = []
    in_notice = False
    stats_line = ""

    for line in cover_markdown.splitlines():
        if line.startswith(">"):
            in_notice = True
            quoted_lines.append(re.sub(r"^>\s?", "", line))
            continue
        if in_notice:
            if not line.strip():
                continue
            stats_line = line.strip().strip("*")
            break

    if not quoted_lines:
        raise SystemExit("Revision notice not found in 00-cover.md")

    title_text = quoted_lines[0].replace("**", "")
    notice_markdown = "\n".join(quoted_lines[1:]).strip()
    notice_flowables = [
        Paragraph(inline_markup(title_text), H1),
        *parse_markdown(notice_markdown),
    ]
    notice_box = Table(
        [[notice_flowables]],
        colWidths=[A4[0] - 34 * mm],
        hAlign="LEFT",
    )
    notice_box.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#eff6ff")),
                ("BOX", (0, 0), (-1, -1), 1.1, colors.HexColor("#60a5fa")),
                ("LINEBEFORE", (0, 0), (0, -1), 4, colors.HexColor("#1d4ed8")),
                ("LEFTPADDING", (0, 0), (-1, -1), 16),
                ("RIGHTPADDING", (0, 0), (-1, -1), 16),
                ("TOPPADDING", (0, 0), (-1, -1), 15),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )

    return [
        notice_box,
        Spacer(1, 10),
        Paragraph("Measured states", H2),
        Paragraph(inline_markup(stats_line), BODY),
        PageBreak(),
    ]


def parse_table(lines: list[str]) -> Table:
    rows = []
    for line in lines:
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        rows.append(cells)
    if len(rows) > 1 and all(re.fullmatch(r":?-{3,}:?", cell) for cell in rows[1]):
        rows.pop(1)
    column_count = max(len(row) for row in rows)
    normalized = [row + [""] * (column_count - len(row)) for row in rows]
    table_data = []
    for row_index, row in enumerate(normalized):
        style = TABLE_HEAD if row_index == 0 else TABLE_CELL
        table_data.append([Paragraph(inline_markup(cell), style) for cell in row])
    available_width = A4[0] - 34 * mm
    col_widths = [available_width / column_count] * column_count
    table = Table(table_data, colWidths=col_widths, repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eef2ff")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#172554")),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#cbd5e1")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#fafbfe")]),
            ]
        )
    )
    return table


def parse_markdown(markdown: str):
    flowables = []
    lines = markdown.splitlines()
    paragraph_lines: list[str] = []

    def flush_paragraph():
        if paragraph_lines:
            text = " ".join(part.strip() for part in paragraph_lines)
            flowables.append(Paragraph(inline_markup(text), BODY))
            paragraph_lines.clear()

    index = 0
    while index < len(lines):
        line = lines[index]
        stripped = line.strip()
        if not stripped:
            flush_paragraph()
            index += 1
            continue
        if stripped.startswith("```"):
            flush_paragraph()
            index += 1
            code_lines = []
            while index < len(lines) and not lines[index].strip().startswith("```"):
                code_lines.append(pdf_safe(lines[index]))
                index += 1
            flowables.append(Preformatted("\n".join(code_lines), CODE))
            index += 1
            continue
        if stripped.startswith("|") and "|" in stripped[1:]:
            flush_paragraph()
            table_lines = []
            while index < len(lines) and lines[index].strip().startswith("|"):
                table_lines.append(lines[index])
                index += 1
            flowables.append(parse_table(table_lines))
            flowables.append(Spacer(1, 4))
            continue
        heading = re.match(r"^(#{1,3})\s+(.+)$", stripped)
        if heading:
            flush_paragraph()
            level = len(heading.group(1))
            style = {1: H1, 2: H2, 3: H3}[level]
            flowables.append(Paragraph(inline_markup(heading.group(2)), style))
            index += 1
            continue
        if re.match(r"^[-*]\s+", stripped) or re.match(r"^\d+\.\s+", stripped):
            flush_paragraph()
            ordered = bool(re.match(r"^\d+\.\s+", stripped))
            items: list[str] = []
            while index < len(lines):
                current = lines[index].strip()
                pattern = r"^\d+\.\s+(.+)$" if ordered else r"^[-*]\s+(.+)$"
                match = re.match(pattern, current)
                if not match:
                    break
                items.append(match.group(1).replace("[ ] ", "[ ] "))
                index += 1
            for item_index, item_text in enumerate(items):
                bullet = f"{item_index + 1}." if ordered else "\u2022"
                flowables.append(
                    Paragraph(inline_markup(item_text), LIST, bulletText=bullet)
                )
            flowables.append(Spacer(1, 4))
            continue
        if stripped == "---":
            flush_paragraph()
            flowables.append(Spacer(1, 8))
            index += 1
            continue
        paragraph_lines.append(stripped)
        index += 1

    flush_paragraph()
    return flowables


def build_pdf():
    missing = [filename for filename in REPORT_FILES if not (CONTENT_DIR / filename).exists()]
    if missing:
        raise SystemExit(f"Missing canonical whitepaper sections: {', '.join(missing)}")
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    story = [*cover_story(), *revision_notice_story()]
    for file_index, filename in enumerate(REPORT_FILES):
        # References continue after the checklist appendix so that the short
        # archived-output block does not occupy a nearly empty page.
        if file_index and filename != "10-references.md":
            story.append(PageBreak())
        markdown = (CONTENT_DIR / filename).read_text(encoding="utf-8")
        story.extend(parse_markdown(markdown))
    doc = WhitepaperDocTemplate(str(OUTPUT_PATH))
    doc.build(story)
    print(f"PDF generated: {OUTPUT_PATH}")


if __name__ == "__main__":
    build_pdf()

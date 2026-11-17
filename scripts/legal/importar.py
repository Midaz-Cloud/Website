#!/usr/bin/env python3
"""Publica una versión de un documento legal a partir del .docx oficial de la Dirección de Productos.

Uso:  python3 scripts/legal/importar.py terminos 2.0 legal/fuentes/terminos-v2-0.docx

Genera (y nunca sobrescribe):
  src/legal/<doc>/<v>.html        texto para la página, convertido tal cual del .docx
  public/legal/<doc>/<v>.txt      texto plano canónico; su SHA-256 es la huella que se guarda al aceptar
  public/legal/<doc>/<v>.pdf      PDF para descargar
e imprime la huella para copiarla en src/data/legal.mjs.
Requiere pandoc y LibreOffice (soffice) con las fuentes Funnel Display y Funnel Sans instaladas.
"""
import hashlib, html, os, re, shutil, subprocess, sys, tempfile

def main():
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    doc, version, src = sys.argv[1], sys.argv[2], sys.argv[3]
    slug = "v" + version.replace(".", "-")
    root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    out_html = os.path.join(root, "src/legal", doc, slug + ".html")
    out_txt = os.path.join(root, "public/legal", doc, slug + ".txt")
    out_pdf = os.path.join(root, "public/legal", doc, slug + ".pdf")
    for p in (out_html, out_txt, out_pdf):
        if os.path.exists(p):
            sys.exit(f"Ya existe {os.path.relpath(p, root)}: una versión publicada no se modifica. Usa un número de versión nuevo.")
        os.makedirs(os.path.dirname(p), exist_ok=True)

    raw = subprocess.run(["pandoc", src, "-t", "html5", "--wrap=none"], check=True, capture_output=True, text=True).stdout
    with open(out_html, "w", encoding="utf-8") as f:
        f.write(limpiar(raw))

    txt = subprocess.run(["pandoc", src, "-t", "plain", "--wrap=none"], check=True, capture_output=True, text=True).stdout
    txt = txt.replace("\r\n", "\n").strip() + "\n"
    with open(out_txt, "w", encoding="utf-8", newline="\n") as f:
        f.write(txt)

    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(["soffice", "--headless", "--convert-to", "pdf", "--outdir", tmp, src], check=True, capture_output=True)
        pdf = os.path.join(tmp, os.path.splitext(os.path.basename(src))[0] + ".pdf")
        shutil.copyfile(pdf, out_pdf)

    print(f"{doc} {version}  sha256 {hashlib.sha256(txt.encode('utf-8')).hexdigest()}")


def texto(fragmento):
    return html.unescape(re.sub(r"<[^>]+>", "", fragmento)).strip()


def limpiar(h):
    # 1. La primera tabla es la portada (marca, título y subtítulo): la página la muestra en su encabezado.
    h = re.sub(r"^\s*<table.*?</table>", "", h, count=1, flags=re.S)
    # 2. Versión y fecha de entrada en vigor van en el encabezado de la página.
    h = re.sub(r"<p><strong>(Versión|Fecha de entrada en vigor):</strong>.*?</p>\s*", "", h, count=2)
    # 3. Tablas de una sola celda = recuadros destacados.
    def caja(m):
        t = m.group(0)
        celdas = re.findall(r"<t[dh](?:\s[^>]*)?>(.*?)</t[dh]>", t, re.S)
        if len(celdas) == 1:
            return '<aside class="legal-recuadro">' + celdas[0].strip() + "</aside>"
        t = re.sub(r"<colgroup>.*?</colgroup>", "", t, flags=re.S)
        t = re.sub(r' style="[^"]*"', "", t)
        return '<div class="legal-tabla">' + t + "</div>"
    h = re.sub(r"<table.*?</table>", caja, h, flags=re.S)
    # 4. "CLÁUSULA 3" / "SECCIÓN 3" seguido del título en negritas → un encabezado con ancla.
    def titulo(m):
        num, nombre = texto(m.group(1)), texto(m.group(2))
        ancla = re.sub(r"[^a-z0-9]+", "-", num.lower().replace("á", "a").replace("ó", "o")).strip("-")
        return f'<h2 id="{ancla}"><span class="legal-num">{html.escape(num)}</span> <span>{html.escape(nombre)}</span></h2>'
    h = re.sub(r"<p><strong>((?:CLÁUSULA|SECCIÓN|ANEXO) [^<]+)</strong></p>\s*<p><strong>([^<]+)</strong></p>", titulo, h)
    # Encabezados sueltos en mayúsculas (p. ej. PREÁMBULO).
    h = re.sub(r"<p><strong>([A-ZÁÉÍÓÚÑ ]{4,})</strong></p>", lambda m: f'<h2 id="{texto(m.group(1)).lower().replace("á","a").replace(" ","-")}">{m.group(1)}</h2>', h)
    # 5. Línea final de identificación (razón social · RIF · versión · fecha).
    h = re.sub(r"<p><strong>(MIDAZ LATAM, C\.A\. — RIF.*?)</strong></p>\s*$", r'<p class="legal-cierre">\1</p>', h.strip(), flags=re.S)
    return h.strip() + "\n"


if __name__ == "__main__":
    main()

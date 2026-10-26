// PDF 내보내기 후처리: 슬라이드의 `detail` / `back` 버튼을 PDF 내부 링크로 만든다.
// 번호가 아니라 routeAlias로 대상을 찾으므로 페이지가 늘어나도 유지된다.
import fs from 'node:fs'
import path from 'node:path'
import { PDFDocument, PDFName, PDFArray } from 'pdf-lib'

const entry = process.argv[2] ?? 'content/slides.md'
const pdfPath = process.argv[3] ?? 'content/dist/presentation.pdf'
const baseDir = path.dirname(entry)

const srcs = [...fs.readFileSync(entry, 'utf8').matchAll(/^src:\s*(.+)$/gm)].map(m => m[1].trim())
const frontmatter = (file) => {
  const m = fs.readFileSync(path.resolve(baseDir, file), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const fm = {}
  for (const line of (m?.[1] ?? '').split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.+)$/)
    if (kv) fm[kv[1]] = kv[2].trim()
  }
  return fm
}
const slides = srcs.map(frontmatter)
const pageOfAlias = alias => slides.findIndex(s => s.routeAlias === alias)

const pdf = await PDFDocument.load(fs.readFileSync(pdfPath))
const pages = pdf.getPages()
if (pages.length !== slides.length)
  throw new Error(`PDF pages (${pages.length}) != slides (${slides.length}); re-run export first.`)

// global-bottom.vue의 버튼 위치와 맞춘 좌표 (슬라이드 폭 1280 기준 px, 쪽번호 왼쪽)
const BTN = { right: 90, width: 104, bottom: 16, height: 27 }
let count = 0
slides.forEach((fm, i) => {
  for (const key of ['detail', 'back']) {
    if (!fm[key]) continue
    const target = pageOfAlias(fm[key])
    if (target < 0) throw new Error(`slide ${i + 1}: ${key} alias "${fm[key]}" not found`)
    const page = pages[i]
    const { width } = page.getSize()
    const k = width / 1280
    const x2 = width - BTN.right * k
    const link = pdf.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [x2 - BTN.width * k, BTN.bottom * k, x2, (BTN.bottom + BTN.height) * k],
      Border: [0, 0, 0],
      Dest: [pages[target].ref, PDFName.of('Fit')],
    })
    const annots = page.node.lookupMaybe(PDFName.of('Annots'), PDFArray) ?? pdf.context.obj([])
    annots.push(pdf.context.register(link))
    page.node.set(PDFName.of('Annots'), annots)
    count++
    console.log(`  slide ${i + 1} ${key} -> slide ${target + 1}`)
  }
})
fs.writeFileSync(pdfPath, await pdf.save())
console.log(`PDF links added: ${count}`)

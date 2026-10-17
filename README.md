# Slidev + GitHub Copilot Presentation Studio

Confluence의 긴 텍스트를 GitHub Copilot로 발표 구조로 재구성하고, Slidev로 HTML/Web 프레젠테이션을 렌더링하며, 특정 페이지만 독립적으로 수정한 뒤 PDF/PPTX로 내보내기 위한 starter project입니다.

## Requirements
- Node.js 22.12+
- VS Code + GitHub Copilot Chat
- Chromium 기반 브라우저 권장

## Start
```bash
npm install
npm run dev
```

브라우저에서 Slidev preview가 열립니다.

## 기본 작업 흐름
1. Copilot Chat에서 `/create-deck`를 선택하고, 같은 메시지에 원문 텍스트를 붙여넣습니다. Markdown 파일이나 첨부파일은 필요하지 않습니다.
2. 필요하면 청중, 발표 목적, 발표 시간도 함께 적습니다. 원문이 없으면 Copilot이 채팅으로 입력을 요청하며, 이전 원문으로 덱을 임의 생성하지 않습니다.
3. Copilot이 입력 내용에 맞춰 발표 구조·장수·시각화를 선택하고 `content/storyline.md`, `slides.md`, `slides/*.md`를 생성/갱신합니다. 원문은 이후 수정·검토를 위해 `content/source.txt`에 자동 보관됩니다.
4. 브라우저 preview를 확인합니다.
5. 특정 장표 수정은 `/revise-slide`을 사용하거나 해당 `slides/NN-*.md`를 직접 편집합니다.
6. 전체 검토는 `/review-deck`을 사용합니다.
7. PDF: `npm run export`
8. 웹 배포용 build: `npm run build`
9. 편집 가능한 PPTX 시도: `npm run export:pptx`

## 프로젝트 스킬
기존 작업 프롬프트 4개는 `.github/skills/<이름>/SKILL.md` 형식의 프로젝트 스킬로 전환되어 있습니다.

| 명령 | 역할 |
| --- | --- |
| `/create-deck` | 채팅에 붙여넣은 원문으로 발표 구성과 슬라이드 생성 |
| `/revise-slide` | 지정한 슬라이드의 문구·구성 수정 |
| `/change-visual` | 사실과 메시지를 유지하며 지정한 슬라이드의 시각화 변경 |
| `/review-deck` | 전체 덱의 흐름·근거·밀도·일관성·렌더링 검토 |

이 프로젝트 루트 폴더를 VS Code에서 열고 새 채팅의 `/` 목록에서 스킬 이름을 검색합니다. 추가 직후 보이지 않으면 `Developer: Reload Window`를 실행한 뒤 새 채팅에서 확인하세요. 사용 중인 채팅 환경이 프로젝트 스킬을 지원하고 활성화되어 있어야 합니다.

## 텍스트로 덱 만들기
Copilot Chat에서 `/create-deck`를 선택한 뒤 다음처럼 입력합니다.

```text
/create-deck
청중: 내부 리더와 실무자
목적: 업무 재설계의 흐름 이해

원문:
Discover에서는 업무 전체를 꺼내고 Target Work를 선정한다.
Decompose에서는 실제 Task와 Sub-task로 분해한다.
Deep Dive에서는 판단, 지식, 예외, 암묵지를 추출한다.
Map에서는 End-to-End As-Is와 기준선을 만든다.
Diagnose에서는 Root Cause와 개선기회를 검증한다.
Redesign에서는 업무 자체를 개선한 뒤 역할을 재배치한다.
Build에서는 실행 가능한 Prototype을 구현한다.
Embed에서는 Pilot하고 효과를 측정하며 정착시킨다.
```

원문에 표나 Markdown 문법이 없어도 됩니다. 기존 덱의 구성을 강제하지 않고, 입력 내용의 핵심 메시지와 관계에 맞춰 구성합니다. 원문에 없는 수치나 근거는 만들지 않습니다. `/create-deck`는 덱 전체를 갱신하므로 특정 페이지만 바꾸려면 `/revise-slide`을 사용합니다.

## 특정 페이지만 수정하는 예
Copilot Chat:
> /revise-slide
> 5페이지를 수정해줘. Diagnose와 Redesign의 차이가 더 즉각적으로 보이게 하고, 텍스트는 20% 줄여줘.

Copilot은 `slides.md`의 5번째 `src`를 찾아 해당 파일만 수정하도록 지시되어 있습니다.

## 구조
- 채팅의 `/create-deck` 입력 텍스트 — 새 덱의 원문 Source of Truth
- `content/source.txt` — 채팅 원문의 자동 보관본; 직접 작성할 필요 없음
- `content/source.md` — 기존 덱용 이전 원문; 자동 보관본이 없는 기존 덱 검토에만 사용
- `content/storyline.md` — 발표 논리/장표 계획
- `slides.md` — Slidev entry; 페이지별 파일을 참조
- `slides/` — 페이지별 Markdown
- `components/` — 재사용 Visual Components
- `styles/index.css` — 공통 디자인 시스템
- `.github/copilot-instructions.md` — Copilot의 프로젝트 공통 규칙
- `.github/skills/` — create/revise/change/review 프로젝트 스킬

## PDF / Download
`npm run export`는 `dist/presentation.pdf`를 생성합니다. `npm run build`에는 Slidev의 `--download` 옵션이 포함되어 있어 빌드된 SPA에서도 PDF 다운로드 기능을 사용할 수 있습니다.

## 설계 원칙
- One slide = one message
- 결론형 headline
- 원문에 없는 사실/수치 생성 금지
- 의미관계에 따라 Visual 선택
- 특정 페이지 요청 시 해당 페이지 파일만 수정
- Global CSS는 전체 디자인 변경일 때만 수정

# Slidev + GitHub Copilot Presentation Studio

Confluence의 긴 텍스트를 GitHub Copilot로 발표 구조로 재구성하고, Slidev로 HTML/Web 프레젠테이션을 렌더링하며, 특정 페이지만 독립적으로 수정한 뒤 PDF/PPTX로 내보내기 위한 starter project입니다.

## Requirements
- Node.js 22.12+
- VS Code + GitHub Copilot Chat
- Chromium 기반 브라우저 권장

## Start
```bash
npm install
```

새로 clone한 프로젝트에는 원문이나 생성된 슬라이드가 포함되지 않습니다. 먼저 아래 `/create-deck` 작업으로 덱을 생성한 다음 `npm run dev`를 실행하면 브라우저에서 Slidev preview가 열립니다.

## 기본 작업 흐름
1. Copilot Chat에서 `/create-deck`를 선택하고, 같은 메시지에 원문 텍스트를 붙여넣습니다. Markdown 파일이나 첨부파일은 필요하지 않습니다.
2. 필요하면 청중, 발표 목적, 발표 시간도 함께 적습니다. 원문이 없으면 Copilot이 채팅으로 입력을 요청하며, 이전 원문으로 덱을 임의 생성하지 않습니다.
3. Copilot이 입력 내용에 맞춰 발표 구조·장수·시각화를 선택하고 `content/storyline.md`, `content/slides.md`, `content/slides/*.md`를 생성/갱신합니다. 원문은 이후 수정·검토를 위해 `content/source.txt`에 자동 보관됩니다.
4. 브라우저 preview를 확인합니다.
5. 특정 장표 수정은 `/revise-slide`을 사용하거나 해당 `content/slides/NN-*.md`를 직접 편집합니다.
6. 전체 검토는 `/review-deck`을 사용합니다.
7. PDF: `npm run export`
8. 웹 배포용 build: `npm run build`
9. 편집 가능한 PPTX 시도: `npm run export:pptx`

PDF export는 `--per-slide`로 각 장을 따로 렌더링해 자동 쪽번호가 페이지마다 갱신되도록 합니다. 이 옵션은 PDF의 슬라이드 간 링크와 목차를 보존하지 않을 수 있습니다.

새 덱은 발표 제목과 짧은 부제가 있는 표지로 시작합니다. 표지를 포함한 모든 장표의 오른쪽 아래에는 `현재 페이지 / 전체 페이지` 형식의 쪽번호가 1부터 자동 표시됩니다. 장표 추가·삭제·순서 변경 시 번호와 전체 장수가 함께 갱신됩니다. 발표자·소속·날짜는 사용자가 제공한 경우에만 표지에 넣습니다.

## 프로젝트 스킬
발표 작업은 `.github/skills/<이름>/SKILL.md` 형식의 프로젝트 스킬 6개로 제공합니다.

| 명령 | 역할 |
| --- | --- |
| `/create-deck` | 채팅에 붙여넣은 원문으로 발표 구성과 슬라이드 생성 |
| `/revise-slide` | 지정한 슬라이드의 문구·구성 수정 |
| `/insert-slide` | 지정한 페이지에 새 장표 삽입; 기존 장표는 유지하고 뒤로 이동 |
| `/delete-slide` | 지정한 페이지를 발표에서 제외; 나머지 장표와 자동 쪽번호 유지 |
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

Copilot은 `content/slides.md`의 5번째 `src`를 찾아 해당 파일만 수정하도록 지시되어 있습니다.

## 원하는 페이지에 장표 추가하기
```text
/insert-slide
5페이지에 새 장표를 삽입해줘.
내용: 여기에 새 장표로 만들 원문을 붙여넣으세요.
```

새 장표가 5페이지가 되고 기존 5페이지부터는 한 페이지씩 뒤로 이동합니다. `5페이지 뒤에 삽입`이라고 하면 새 장표는 6페이지가 됩니다. 표지도 1페이지로 세며, `맨 끝에 추가`도 사용할 수 있습니다. 표지 앞에 삽입하려는 경우에는 먼저 의도를 확인합니다.

기존 장표를 덮어쓰거나 파일명을 일괄 변경하지 않습니다. 새 장표 파일과 진입점 참조를 추가하고, 필요한 원문·스토리라인만 갱신하며 쪽번호와 전체 장수는 자동으로 반영됩니다. 위치나 내용이 빠져 있으면 입력을 요청합니다.

## 특정 페이지 삭제하기
```text
/delete-slide
5페이지를 삭제해줘.
```

`3, 5페이지 삭제` 또는 `4~6페이지 삭제`처럼 여러 페이지도 지정할 수 있습니다. 표지를 1페이지로 세며, 여러 번호는 모두 삭제 전의 페이지 순서를 기준으로 처리합니다. 뒤의 장표는 앞으로 이동하고 쪽번호·전체 장수는 자동 갱신됩니다.

기본 동작은 발표 진입점에서 해당 페이지를 제외하는 것입니다. 복구할 수 있도록 원래 장표 파일과 이미지는 로컬에 보존합니다. 파일까지 지우려면 명시적으로 요청해야 하며, 다른 장표에서 사용하는 파일은 삭제하지 않습니다. 표지 삭제는 먼저 확인하고, 전체 장표를 한 번에 삭제해 빈 덱을 만들지는 않습니다. 원문은 유지하며, 기존 PDF/PPTX는 다시 내보내기 전까지 이전 상태입니다.

## 구조
- 채팅의 `/create-deck` 입력 텍스트 — 새 덱의 원문 Source of Truth
- `content/source.txt` — 채팅 원문의 자동 보관본; 직접 작성할 필요 없음
- `content/source.md` — 기존 덱용 이전 원문; 자동 보관본이 없는 기존 덱 검토에만 사용
- `content/storyline.md` — 발표 논리/장표 계획
- `content/slides.md` — Slidev entry; `./slides/` 기준으로 페이지별 파일을 참조
- `content/slides/` — 페이지별 Markdown
- `content/public/` — 첨부 이미지 등 자산; 슬라이드에서는 `/image.png` 형태의 URL로 참조
- `content/dist/` — 웹 빌드 및 PDF/PPTX 결과물
- `components/` — 재사용 Visual Components
- `global-bottom.vue` — 표지를 포함한 전체 슬라이드의 자동 쪽번호
- `styles/index.css` — 공통 디자인 시스템
- `.github/copilot-instructions.md` — Copilot의 프로젝트 공통 규칙
- `.github/skills/` — create/revise/insert/delete/change/review 프로젝트 스킬

## PDF / Download
`npm run build`는 `content/dist/`에 웹 빌드를, `npm run export`는 `content/dist/presentation.pdf`를, `npm run export:pptx`는 `content/dist/presentation.pptx`를 생성합니다. 빌드에는 Slidev의 `--download` 옵션이 포함되어 있어 빌드된 SPA에서도 PDF 다운로드 기능을 사용할 수 있습니다.

## 로컬 발표 폴더
입력과 결과물은 모두 `content/` 하나 아래에서 관리합니다.

```text
content/
  source.md         # 사용자가 제공한 원문 파일이 있는 경우
  source.txt        # 원문 자동 보관본
  storyline.md      # 발표 구성
  slides.md         # 발표 진입점
  slides/           # 표지 및 개별 장표
  public/           # 첨부 이미지
  dist/             # 웹/PDF/PPTX 결과물
```

공통 컴포넌트, 스타일, 자동 쪽번호는 프로젝트 루트에 남습니다. `content/slides.md`의 첫 frontmatter에 `addons: ['@/..']`를 설정해 이 공통 도구를 불러옵니다. `@/`는 Slidev 진입점 폴더를 기준으로 하므로 상위 프로젝트 루트를 정확히 가리킵니다. 별도 파일 복제 없이 새 덱에서도 같은 디자인과 쪽번호를 사용합니다.

## Git 관리 범위
GitHub에는 스킬, 공통 컴포넌트, 디자인 시스템, 패키지 설정 등 제작 도구만 관리합니다. 다음 경로는 `.gitignore`로 제외하며 로컬 파일은 유지합니다.

| 경로 | 로컬 전용 내용 |
| --- | --- |
| `content/` | 입력 원문, 자동 보관본, 스토리라인, 발표 진입점, 장표, 첨부 이미지, 웹/PDF/PPTX 결과물 전체 |

발표별 자산은 `content/public/`, 내보내기 파일은 `content/dist/` 안에 저장하세요. 이전 구조의 루트 `slides.md`, `slides/`, `public/`, `dist/` 제외 규칙도 실수로 다시 추적되지 않도록 유지합니다. 이 파일들을 강제로 추가하거나 원문을 추적 중인 제작 도구 파일에 복사하지 않습니다.

이미 추적된 파일은 로컬을 삭제하지 않고 Git 인덱스에서 제외해야 합니다. 이 변경을 커밋·푸시하면 최신 브랜치에서는 제거되지만 **과거 커밋의 원문이나 결과물은 남습니다.** 민감한 자료를 과거 이력에서도 삭제하려면 별도 이력 정리와 협업자 조율이 필요합니다.

## 설계 원칙
- One slide = one message
- 결론형 headline
- 원문에 없는 사실/수치 생성 금지
- 의미관계에 따라 Visual 선택
- 특정 페이지 요청 시 해당 페이지 파일만 수정
- Global CSS는 전체 디자인 변경일 때만 수정

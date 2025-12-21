# The Spectrum of Extinction

An interactive data visualization website showcasing the extinction crisis of species using IUCN Red List data.

## Features

- Interactive global map with species locations
- Year slider (2009-2025) to visualize historical status changes
- Category filters (Mammals, Birds, Fish, Reptiles, Amphibians, Insects, Plants)
- Dashboard with bar charts and photo grid
- Detailed species information modal

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Mapbox GL JS
- Recharts

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Generate mock data:

```bash
npm run fetch-data
```

3. Run development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Deployment

This project is configured for static export and can be deployed to GitHub Pages.

### GitHub Pages (추천: GitHub Actions로 자동 배포)

1) **Repo 설정**
- GitHub에서 `Settings → Pages`로 이동
- **Source**를 **GitHub Actions**로 선택

2) **(선택) Mapbox 토큰 설정**
- 이 프로젝트는 클라이언트에서 Mapbox를 사용하므로 토큰은 번들에 포함됩니다. (즉, “public token” 취급)
- GitHub에서 `Settings → Secrets and variables → Actions → New repository secret`
- 이름: `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
- 값: Mapbox access token

3) **배포 트리거**
- `main`(또는 `master`) 브랜치에 push 하면 `.github/workflows/deploy-pages.yml`이 실행되어 자동 배포됩니다.
- 최초 배포 후 페이지 URL은 `Actions` 실행 결과의 `deploy` 단계에서 확인할 수 있습니다.

### 로컬에서 Pages 경로로 미리보기(선택)

GitHub Pages는 보통 `/<repo>` 하위 경로로 서비스되므로, 로컬에서 동일하게 확인하려면:

```bash
NEXT_PUBLIC_BASE_PATH="/<repo>" npm run build
```

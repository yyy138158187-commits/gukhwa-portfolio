# Gukhwa — Motion Design Studio

Gukhwa 모션그래픽 브랜드 포트폴리오 사이트입니다. 빌드 과정 없는 정적 사이트(HTML/CSS/JS)라서 저장소 루트를 그대로 배포하면 됩니다.

- `index.html` — 페이지 구조
- `assets/style.css` — 스타일
- `assets/main.js` — 인터랙션, 예약 흐름
- `videos/` — 포트폴리오 영상

로컬에서 보기:

```bash
python -m http.server 8765
```

예약을 실제로 접수하려면 `assets/main.js`의 `FORM_ENDPOINT`에 Formspree 등의 주소를 넣으세요.

# 🐾 이정민 애견미용학원

<!-- 뱃지: gmcms226-web/ljm 부분이 본인 GitHub username/레포명입니다. 변경 불필요 -->
![GitHub last commit](https://img.shields.io/github/last-commit/gmcms226-web/ljm?color=pink)
![GitHub repo size](https://img.shields.io/github/repo-size/gmcms226-web/ljm)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

<!-- 프로젝트 한 줄 소개 -->
> 대전 소재 이정민 애견미용학원의 공식 웹사이트입니다.

<br>

---

## 1. 📖 프로젝트 소개

<!-- 3~5문장으로 프로젝트 배경과 목적을 설명하세요 -->
이 프로젝트는 **이정민 애견미용학원**의 공식 웹사이트로, 학원 소개·강의 안내·공지사항·학생 실습 갤러리·오시는 길 등 학원의 전반적인 정보를 제공하기 위해 제작되었습니다.  
별도의 프레임워크 없이 HTML·CSS·Vanilla JS만으로 구현한 정적 멀티페이지 사이트이며, Firebase Auth 기반 회원 인증과 외부 API 연동을 포함합니다.

<br>

---

## 2. 📸 Before / After

<!-- 스크린샷을 assets/images/readme/ 폴더에 넣고 파일명을 맞춰주세요 -->
<!-- 이미지가 없으면 이 섹션 전체를 삭제하거나 주석 처리하세요 -->

| Before | After |
|:---:|:---:|
| ![before](./assets/images/readme/before.png) | ![after](./assets/images/readme/after.png) |
| 기존 디자인 | 리뉴얼 디자인 |

<br>

---

## 3. ⚠️ 주의사항

<!-- 프로젝트 사용 시 꼭 알아야 할 내용을 작성하세요 -->

> [!WARNING]
> - Firebase Auth 및 네이버 지도 API는 `file://` 환경에서 동작하지 않습니다. 반드시 로컬 서버를 통해 실행하세요.
> - API 키(OpenWeatherMap, Firebase, Naver Maps)가 소스 코드에 직접 포함되어 있습니다. 실 서비스 배포 시 환경 변수로 분리하세요.
> - `assets/images/pracitce/` 디렉토리명에 오탈자가 있습니다. 이미지 경로 수정 시 실제 폴더명을 확인하세요.

<br>

---

## 4. 📋 프로젝트 정보

### 담당 역할

<!-- 본인이 맡은 역할에 [x] 체크, 아닌 것은 [ ] 로 두세요 -->
- [x] 기획
- [x] UI/UX 디자인
- [x] 프론트엔드 개발
- [ ] 백엔드 개발
- [ ] 배포 및 인프라

### 작업 기간

<!-- 실제 작업 기간으로 수정하세요 (예: 2025.06.01 ~ 2025.07.01) -->

| 구분 | 기간 |
|---|---|
| 전체 기간 | 2025.00.00 ~ 2025.00.00 |
| 기획 | 2025.00.00 ~ 2025.00.00 |
| 디자인 | 2025.00.00 ~ 2025.00.00 |
| 개발 | 2025.00.00 ~ 2025.00.00 |

### 기여도

<!-- 개인 프로젝트면 이름/역할/100%로 수정하세요 -->

| 이름 | 역할 | 기여도 |
|---|---|:---:|
| 이정민 | 기획, 디자인, 프론트엔드 | 100% |

<br>

---

## 5. 🛠️ 기술 스택

<!-- 사용하지 않은 뱃지는 줄째 삭제하세요. 추가하려면 shields.io에서 생성할 수 있어요 -->

**Frontend**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

**Database / Auth**

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)

**외부 API**

![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-EB6E4B?style=flat-square&logo=openweathermap&logoColor=white)
![Naver](https://img.shields.io/badge/Naver_Maps-03C75A?style=flat-square&logo=naver&logoColor=white)

**Library**

![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white)

**Tools**

![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)

<br>

---

## 6. 🤖 AI 활용

### 사용한 AI 도구

<!-- 사용한 AI 도구와 용도를 작성하세요 -->

| 도구 | 용도 |
|---|---|
| Claude Code | 코드 작성 보조, 디버깅, CSS 구조 설계 |

### AI 활용 내용

<!-- AI가 실제로 도움을 준 부분을 구체적으로 작성하세요 -->
- Firebase Auth 이벤트 충돌 해결 방법 참고
- 반응형 레이아웃 그리드 구조 개선 제안 수용
- CSS 변수 및 BEM 네이밍 일관성 검토

### 직접 구현한 내용

<!-- AI 없이 본인이 직접 설계하고 구현한 핵심 내용을 작성하세요 -->
- 전체 UI/UX 설계 및 디자인 시스템 구축
- 페이지별 CSS 아키텍처 설계 (BEM 방법론 적용)
- Swiper 슬라이더 커스텀 설정 및 데이터 구조 설계
- 네이버 지도 API 연동 및 하버사인 거리 계산 로직
- Firebase Firestore 사용자 데이터 설계

<br>

---

## 7. 🔗 프로젝트 링크

<!-- 배포 URL이 생기면 # 부분을 실제 주소로 교체하세요 -->
<!-- 없는 항목은 해당 줄을 삭제하세요 -->

| 구분 | 링크 |
|---|---|
| 🌐 배포 사이트 | [바로가기](#) |
| 🐙 GitHub | [바로가기](https://github.com/gmcms226-web/ljm) |

<br>

---

## 8. 🗺️ 프로젝트 개요

<!-- 프로젝트 전체 구조를 한눈에 볼 수 있게 작성하세요 -->

```
이정민 애견미용학원 웹사이트
 ├── index.html        메인 홈페이지 (슬라이더, 날씨, 강의 소개, 강사진, 상담 신청)
 ├── about.html        학원 소개 (학원 정보, 시설 안내)
 ├── notice.html       공지사항 목록
 ├── notice-01~03.html 공지사항 상세 페이지
 ├── gallery.html      학생 실습 갤러리 (리뷰 슬라이더 + 사진 그리드)
 └── location.html     오시는 길 (네이버 지도 + 현재 위치 거리 계산)
```

<br>

---

## 9. ✨ 주요 기능

<!-- 핵심 기능을 표로 정리하세요. 행을 추가/삭제해도 됩니다 -->

| 기능 | 설명 |
|---|---|
| 🔐 회원 인증 | Google 소셜 로그인 / 이메일 로그인·회원가입·비밀번호 찾기 |
| 🌤️ 실시간 날씨 | OpenWeatherMap API 연동, 대전 현재 날씨 30분 간격 자동 갱신 |
| 🗺️ 지도 | 네이버 지도 임베드, 사용자 현재 위치 마커 및 하버사인 거리 계산 |
| 🖼️ 슬라이더 | Swiper v11 기반 실습 사진·시설·갤러리 리뷰 다중 슬라이더 |
| 💬 상담 신청 | 코스 선택 + 정보 입력 → 확인 모달 (UI 확인 전용) |
| 📱 반응형 | 모바일·태블릿·데스크탑 전 해상도 대응 |

<br>

---

## 10. 💡 핵심 구현 내용

<!-- 기술적으로 도전적이었거나 중요한 구현을 코드와 함께 설명하세요 -->
<!-- 코드블록 언어(javascript, css 등)는 실제 코드에 맞게 변경하세요 -->

### Firebase 인증 모듈 (ES Module)

```javascript
// Google OAuth 팝업 로그인 + Firestore 사용자 저장
async function loginWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  await setDoc(doc(db, 'users', result.user.uid), {
    name: result.user.displayName,
    email: result.user.email,
    createdAt: new Date()
  }, { merge: true });
}
```

### 네이버 지도 + 현재 위치 거리 계산

```javascript
// Haversine 공식으로 사용자 위치 → 학원 거리 계산
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
```

### 갤러리 스크롤 애니메이션

```javascript
// IntersectionObserver로 스크롤 시 갤러리 아이템 순차 등장
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.1 });
```

<br>

---

## 11. 🐛 Trouble Shooting

<!-- <summary> 안의 제목과 내용을 본인의 실제 경험으로 교체하세요 -->
<!-- 항목을 추가하려면 <details>...</details> 블록 전체를 복사해서 붙여넣으세요 -->

<details>
<summary><b>로그인 상태에서 헤더 버튼 클릭 시 모달이 함께 열리는 문제</b></summary>

**문제**  
로그인 상태에서 헤더 버튼 클릭 시 로그아웃 처리와 동시에 `common.js`의 로그인 모달 오픈 리스너가 중복 실행됨.

**원인**  
`common.js`와 `firebase-auth.js` 두 파일이 동일한 버튼에 이벤트 리스너를 등록하여 이벤트 버블링으로 중복 실행.

**해결**  
로그아웃 핸들러에 캡처 페이즈(`capture: true`) + `stopImmediatePropagation()` 적용.

```javascript
loginBtn.addEventListener('click', handleLogout, true);
function handleLogout(e) {
  e.stopImmediatePropagation();
  signOut(auth);
}
```

</details>

<details>
<summary><b>Swiper 아카데미 슬라이더 슬라이드 수 불일치 오류</b></summary>

**문제**  
아카데미 시설 슬라이더에서 일부 슬라이드가 표시되지 않거나 빈 슬라이드가 생성됨.

**원인**  
`swiper-init.js`의 `academyData[]` 배열 항목 수와 HTML `swiper-slide` div 수가 불일치.

**해결**  
`academyData` 배열(11개)과 HTML 슬라이드(11개)를 동기화.

</details>

<br>

---

## 12. ⚡ 성능 최적화

<!-- 성능 개선을 위해 적용한 내용을 작성하세요. 없는 항목은 삭제해도 됩니다 -->

- **CSS 분리 로드** — 페이지별 필요한 CSS만 `<link>`로 로드하여 초기 렌더링 속도 개선
- **API 호출 최소화** — 날씨 API 30분 간격 호출로 불필요한 네트워크 요청 절감
- **IntersectionObserver** — 스크롤 이벤트 대신 사용하여 갤러리 애니메이션 성능 향상
- **이미지 object-fit** — `object-fit: cover/contain` 적용으로 레이아웃 시프트(CLS) 방지

<br>

---

## 13. 🗄️ 데이터 구조

<!-- DB 스키마나 주요 데이터 구조를 작성하세요. 없으면 섹션 전체 삭제 가능 -->

### Firestore `users` 컬렉션

```json
{
  "uid": "string (Firebase Auth UID)",
  "name": "string",
  "phone": "string",
  "email": "string",
  "createdAt": "timestamp"
}
```

<br>

---

## 14. 📁 프로젝트 구조

<!-- 핵심 파일·폴더 위주로 작성하세요. 전체를 나열하지 않아도 됩니다 -->

```
ljm/
├── index.html
├── about.html
├── notice.html
├── notice-01.html
├── notice-02.html
├── notice-03.html
├── gallery.html
├── location.html
├── favicon.png
└── assets/
    ├── css/
    │   ├── common.css         # CSS 변수 전역 정의 (색상·폰트·간격)
    │   ├── header.css / footer.css
    │   └── ...                # 페이지·섹션별 스타일
    ├── js/
    │   ├── common.js          # 전 페이지 공통 (햄버거, 탑버튼, 모달 등)
    │   ├── firebase-auth.js   # 인증 모듈 (ES Module)
    │   ├── swiper-init.js     # 홈 슬라이더
    │   ├── gallery.js         # 갤러리 슬라이더 + 스크롤 애니메이션
    │   ├── weather.js         # 날씨 API
    │   └── location-map.js    # 네이버 지도
    └── images/
        ├── pracitce/          # 홈 실습 슬라이더 (1.jpg ~ 12.jpg)
        ├── academy/           # 시설 슬라이더 (academy-01.jpg ~ 11.jpg)
        ├── gallery/           # 갤러리 그리드
        └── teachers/          # 강사 프로필
```

<br>

---

## 15. ▶️ 실행 방법

<!-- 실행 순서가 다르면 수정하세요 -->

```bash
# 1. 저장소 클론
git clone https://github.com/gmcms226-web/ljm.git

# 2. 디렉토리 이동
cd ljm

# 3. 로컬 서버 실행
npx serve .
```

> VS Code **Live Server** 익스텐션으로도 실행할 수 있습니다.  
> `file://`로 직접 열면 Firebase Auth와 네이버 지도가 동작하지 않습니다.

<br>

---

## 16. 🔧 개선 예정

<!-- 완료된 항목은 [x]로 체크, 예정 항목은 [ ]로 유지하세요 -->

- [ ] 공지사항 관리자 CMS 연동 (현재 HTML 하드코딩)
- [ ] 상담 신청 폼 실제 데이터 전송 기능 구현
- [ ] 이미지 디렉토리 오탈자 수정 (`pracitce` → `practice`)
- [ ] `about.html` 중복 `footer.css` 로드 제거
- [ ] Lighthouse 성능 점수 90점 이상 달성

<br>

---

## 17. 📚 프로젝트를 통해 배운 점

<!-- 이 프로젝트를 통해 새롭게 배우거나 성장한 내용을 자유롭게 작성하세요 -->

- Firebase ES Module 방식의 트리쉐이킹 구조와 `type="module"` 스크립트의 자동 defer 동작 원리 이해
- BEM 방법론을 실제 프로젝트 전체에 일관성 있게 적용하는 경험
- 이벤트 버블링·캡처 페이즈 차이를 실무 문제 해결에 활용
- 외부 API 연동 시 비동기 처리 패턴 및 에러 핸들링 숙달
- CSS 변수 기반 디자인 시스템이 유지보수에 얼마나 효과적인지 체감

<br>

---

## 18. 💬 프로젝트 회고

<!-- 솔직하게 작성할수록 포트폴리오로서 가치가 높아요 -->

**잘한 점**
- CSS 변수와 BEM으로 일관된 디자인 시스템을 처음부터 설계한 것
- 페이지별 CSS 분리로 유지보수성을 높인 구조 설계
- 프레임워크 없이 순수 JS로 인증·지도·날씨 등 다양한 기능을 구현한 것

**아쉬운 점**
- 헤더·푸터를 컴포넌트화하지 않아 수정 시 8개 파일을 모두 변경해야 하는 구조
- 초기 설계 단계에서 이미지 디렉토리 네이밍을 꼼꼼히 확인하지 못한 것

**다음에 적용할 점**
- 공통 컴포넌트(헤더·푸터)는 프로젝트 초반에 설계 방식 결정하기
- 디렉토리·파일 네이밍 컨벤션을 먼저 정하고 시작하기

<br>

---

## 19. 📄 License

<!-- 이름을 본인 이름으로 교체하세요 -->

```
MIT License

Copyright (c) 2025 이정민

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<!-- 본인 이름과 GitHub 주소로 교체하세요 -->
<div align="center">

Made with ❤️ by [이정민](https://github.com/gmcms226-web)

</div>

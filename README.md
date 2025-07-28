# [Placesurf](https://www.placesurf.xyz/)

**계획된 일정, 완벽한 하루**

낯선 곳을 여행할 때마다 맛집, 액티비티, 주변 명소를 찾느라 한참을 검색하곤 했어요.  
만약 이 도시를 잘 아는 친구가 **내 코스를 계획해준다면?**

**Placesurf**는 사용자가 여러 장소를 선택하고, 이미지와 설명을 추가해 하나의 ‘로그’ 단위로 발행하는 SNS 기반 웹 어플리케이션입니다.

<br/>

## 🛠️ Tech Stack

<table>
  <tr>
    <td><strong>Frontend</strong></td>
    <td>
      <img src="https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white" height="20" style="margin-right:8px;" />
      <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" height="20" style="margin-right:8px;" />
      <img src="https://img.shields.io/badge/Shadcn_UI-%23EDEDED?logo=storybook&logoColor=black" height="20" style="margin-right:8px;" />
    </td>
  </tr>
  <tr>
    <td><strong>State / Form</strong></td>
    <td>
      <img src="https://img.shields.io/badge/Zustand-000000?logo=zotero&logoColor=white" height="20" style="margin-right:8px;" />
      <img src="https://img.shields.io/badge/TanStack_Query-FF4154?logo=react-query&logoColor=white" height="20" style="margin-right:8px;" />
      <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white" height="20" style="margin-right:8px;" />
      <img src="https://img.shields.io/badge/Zod-3E52B5?logo=graphql&logoColor=white" height="20" style="margin-right:8px;" />
    </td>
  </tr>
  <tr>
    <td><strong>Backend</strong></td>
    <td>
      <img src="https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white" height="20" style="margin-right:8px;" />
      <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" height="20" style="margin-right:8px;" />
    </td>
  </tr>
  <tr>
    <td><strong>Mock / 테스트</strong></td>
    <td>
      <img src="https://img.shields.io/badge/MSW-FF6A00?logo=msw&logoColor=white" height="20" />
    </td>
  </tr>
</table>

<br/>

## 기능 명세서 (Functional Specification)

| 주요 기능                | 세부 기능                            | 설명                                                                        |
| ------------------------ | ------------------------------------ | --------------------------------------------------------------------------- |
| **1. 로그 관리**         | 1.1 로그 등록                        | 장소에 대한 사진과 텍스트 설명을 등록하여 나만의 로그를 작성할 수 있습니다. |
|                          | 1.2 로그 조회                        | 등록한 로그의 상세 내용을 확인할 수 있습니다.                               |
|                          | 1.3 로그 수정                        | 작성한 로그의 내용을 수정할 수 있습니다.                                    |
|                          | 1.4 로그 삭제                        | 필요 없는 로그를 삭제할 수 있습니다.                                        |
| **2. 장소 검색 및 조회** | 2.1 키워드 기반 검색                 | 입력한 검색어를 기반으로 관련 장소를 조회할 수 있습니다.                    |
|                          | 2.2 셀렉트 박스를 활용한 필터링      | 카테고리 또는 지역 등 조건을 선택하여 장소를 좁혀서 볼 수 있습니다.         |
| **3. 커뮤니티 기능**     | 3.1 장소/로그 북마크                 | 관심 있는 장소와 로그를 북마크하여 저장할 수 있습니다.                      |
|                          | 3.2 사용자 팔로우 및 마이페이지 연동 | 팔로우한 사용자의 활동을 마이페이지에서 확인할 수 있습니다.                 |
| **4. 반응형 디자인**     | 4.1 모바일/PC 최적화                 | 다양한 디바이스에 최적화된 UI/UX를 제공합니다.                              |

<br/>

## 🚀 트러블슈팅 & 개발 전략 요약

1. [**서버-클라이언트 데이터 공유 전략 (Next.js 15 + TanStack Query)**](https://github.com/project2025-a/project2025-next/wiki/%EC%84%9C%EB%B2%84%E2%80%90%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B3%B5%EC%9C%A0-%EC%A0%84%EB%9E%B5-%28Next.js-15---TanStack-Query%29)

2. [**드롭박스 오픈 시 테두리 깜빡임 현상 해결**](https://github.com/project2025-a/project2025-next/wiki/%EB%93%9C%EB%A1%AD%EB%B0%95%EC%8A%A4-%EC%98%A4%ED%94%88-%EC%8B%9C-%ED%85%8C%EB%91%90%EB%A6%AC-%EA%B9%9C%EB%B9%A1%EC%9D%B4%EB%8A%94-%ED%98%84%EC%83%81)

   - Framer Motion 관련 GPU 레이어 문제로 인한 UI 깜빡임을 해결한 사례입니다.

3. [**프로필 페이지 이미지 업로드 속도 개선 (11,009ms 단축)**](https://github.com/project2025-a/project2025-next/wiki/%ED%94%84%EB%A1%9C%ED%95%84%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EC%86%8D%EB%8F%84%EA%B0%9C%EC%84%A0)

   - 업로드 방식을 변경해 이미지 업로드 속도를 약 3배 빠르게 개선했습니다.

4. [**이미지 업로드 최적화 트러블슈팅 (react-image-file-resizer → browser-image-compression)**](https://nayah.tistory.com/190)

   - 라이브러리 변경으로 화질 저하 없이 파일 크기를 80% 이상 줄였습니다.

5. [**react-hook-form 개선기 (Next.js 마이그레이션)**](https://nayah.tistory.com/195)

6. [**Supabase Storage 이미지 업로드: 서버 액션에서 Signed URL 전환 경험 및 문제 해결**](https://nayah.tistory.com/196)

   - 서버 액션에서 Blob 대신 Signed URL로 이미지 업로드 방식을 전환하며 겪은 문제와 해결법입니다.

7. [**Supabase Storage 단일/중첩 폴더 이미지 삭제 로직 및 구현 방법**](https://nayah.tistory.com/197)

   - 단일 및 중첩된 폴더 구조의 이미지 삭제를 구현하는 방법을 정리했습니다.

8. [**중첩 객체 ↔ FormData 유틸 함수 제작기**](https://nayah.tistory.com/198)

   - 복잡한 중첩 객체를 FormData로 변환하고 다시 객체로 복원하는 유틸 함수 제작 과정을 정리했습니다.

<br/>

## Demo

| 기능            | 웹 버전 이미지                                                                                            | 모바일 버전 이미지                                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **로그 조회**   | <img src="https://github.com/user-attachments/assets/3596e592-cb53-4818-a0d3-b10deca20cee" width="450" /> | <img src="https://github.com/user-attachments/assets/3587104e-a4a8-40d6-b8cc-294b9caff2f7" width="280" /> |
| **로그 등록**   | <img src="https://github.com/user-attachments/assets/c321853e-0929-4862-97b5-dcb8d9c01a82" width="450" /> | <img src="https://github.com/user-attachments/assets/a78b2961-ed7d-4135-b134-70cabf74d8a2" width="280" /> |
| **로그 수정**   | <img src="https://github.com/user-attachments/assets/fec77376-ef98-4da6-b21b-115b79b0e6ca" width="450" /> | <img src="https://github.com/user-attachments/assets/43397ce4-9709-40b7-abaf-86c0a71b00bb" width="280" /> |
| **상세 페이지** | <img src="https://github.com/user-attachments/assets/70821a19-a5b4-494e-a74b-afbaf4693090" width="450" /> | <img src="https://github.com/user-attachments/assets/bf2e3a8b-dbad-4810-8516-bca877d120ff" width="280" /> |
| **검색**        | <img src="https://github.com/user-attachments/assets/557d999f-39b9-4f17-ab08-4d96ebd2e2a6" width="450" /> | <img src="https://github.com/user-attachments/assets/08c26426-6894-4e0b-bf6d-0c489a6369c6" width="280" /> |
| **마이페이지**  | <img src="https://github.com/user-attachments/assets/302d6c2d-8f1d-4100-a35c-1a3fa9f9ad0c" width="450" /> | <img src="https://github.com/user-attachments/assets/56292c35-aa0c-481f-b154-a68b4ad08753" width="280" /> |
| **프로필 수정** | <img src="https://github.com/user-attachments/assets/37179d24-f77e-4f42-b047-7489d953fff2" width="450" /> | <img src="https://github.com/user-attachments/assets/5bd19d8e-70b5-46d0-b917-aeb7a2eb7791" width="280" /> |

<br/>

## Getting Started

### 1. 프로젝트 클론

```
git clone https://github.com/project2025-a/project2025-next.git
```

### 2. 의존성 설치

```
npm install
```

### 3. 개발 서버 실행

```
npm run dev
```

<br/>

## Folder Structure

```
📦src
 ┣ 📂app
 ┃ ┣ (root)               # 홈, 로그인, 프로필 등 주요 페이지
 ┃ ┣ (log-editor)         # 로그 등록 및 수정 관련 페이지
 ┃ ┣ (no-header-footer)   # 약관, 공지 등 header/footer 없는 페이지
 ┃ ┣ actions              # 서버 액션 (Server Actions)
 ┃ ┣ api
 ┃ ┣ assets               # 폰트, 이미지 등 정적 리소스
 ┃ ┗ layout.tsx           # 앱 전역 레이아웃
 ┣ 📂components
 ┃ ┣ common               # 버튼, 카드, 헤더, 모달 등 범용 UI
 ┃ ┣ features             # 도메인 단위 UI (로그, 장소, 북마크 등)
 ┃ ┣ ui                   # Shadcn UI 컴포넌트
 ┣ 📂constants            # 상수 데이터 (도시 목록, 태그 등)
 ┣ 📂hooks
 ┃ ┣ mutations            # useMutation 기반 훅
 ┃ ┣ queries              # useQuery 기반 훅
 ┃ ┗ ...                  # 기타 커스텀 훅
 ┣ 📂lib
 ┃ ┣ supabase             # Supabase 클라이언트 및 관련 유틸
 ┃ ┣ schemas              # Zod 스키마
 ┃ ┗ utils                # 공통 유틸 함수
 ┣ 📂providers            # React Provider 설정 (QueryClient 등)
 ┣ 📂stores               # Zustand 기반 글로벌 상태
 ┣ 📂styles               # Tailwind 등 글로벌 스타일
 ┣ 📂types                # 타입 정의 (API 응답, 도메인 모델 등)

```

<br/>

## 서비스 개요 및 개발 배경

<img width="878" alt="Image" src="https://github.com/user-attachments/assets/c7688aec-5b5a-4f0e-8203-361336b50787" />
<img width="878" alt="Image" src="https://github.com/user-attachments/assets/33161091-11e9-4270-ae75-1b7f21b57f64" />
<img width="878" alt="Image" src="https://github.com/user-attachments/assets/eb6d59bd-fb87-4cae-88de-14c7316977a3" />
<img width="878" alt="Image" src="https://github.com/user-attachments/assets/f7107d7c-f4e4-4b3a-8008-8bcc7d521348" />
<img width="878" alt="Image" src="https://github.com/user-attachments/assets/a563518a-6d82-4867-a8fb-ca8b254380dd" />
<img width="878" alt="Image" src="https://github.com/user-attachments/assets/bf1dbe7e-5510-4006-9b96-7e757b64df7a" />

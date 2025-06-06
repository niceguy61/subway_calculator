# 서브웨이 칼로리 계산기

서브웨이 샌드위치의 영양 정보를 계산해주는 웹 애플리케이션입니다.

https://subway-cal.drumgoon.net

> 이 프로젝트는 Amazon Q를 활용하여 개발되었습니다.

## 구현된 기능

- **재료 선택 기능**
  - 사이즈 선택 (15cm, 30cm)
  - 빵 종류 선택
  - 메인 재료(고기) 선택
  - 채소 다중 선택
  - 치즈 선택 (또는 선택 안함)
  - 소스 다중 선택 (또는 선택 안함)

- **영양 정보 계산**
  - 선택한 재료에 따른 실시간 영양 정보 계산
  - 칼로리, 탄수화물, 단백질, 지방, 나트륨 정보 제공
  - 상단 바에 실시간 칼로리 표시 (칼로리 수준에 따른 색상 변화)

- **사용자 경험 개선**
  - 상태 바를 통한 선택 진행 상황 확인
  - 상태 바 클릭 시 해당 섹션으로 스크롤 이동
  - 메인 재료에 마우스 올리면 설명 정보 표시
  - 반응형 디자인으로 모바일에서도 사용 가능

- **공유 기능**
  - 현재 선택한 재료 조합을 URL로 공유 가능
  - URL 파라미터를 통한 재료 조합 불러오기
  
- **랜덤 조합 기능**
  - 버튼 클릭 시 랜덤으로 재료 조합 생성
  - 모든 선택 초기화 버튼 제공

- **기타 기능**
  - 업데이트 노트 제공
  - 데이터 출처 및 면책 정보 제공
  - 한국어/영어 언어 전환 지원

## 시작하기

### 필수 조건

- Node.js 14.0.0 이상
- Yarn 1.22.0 이상

### 설치 방법

1. 저장소를 클론합니다.
```
git clone https://github.com/niceguy61/subway-calories-counter.git
```

2. 필요한 패키지를 설치합니다.
```
yarn install
```

3. 개발 서버를 실행합니다.
```
yarn start
```

4. 브라우저에서 http://localhost:3000 으로 접속합니다.

### 빌드 방법

프로덕션 환경을 위한 빌드를 생성합니다.
```
yarn build
```

## 기술 스택

- React 19.1.0
- React Router 7.6.0
- CSS (반응형 디자인)
- Amazon Q (AI 코드 어시스턴트)

## 데이터 출처

- [한국 서브웨이 성분표](https://www.subway.co.kr)
- [Subway Menu & Nutrition](https://www.subway.com/en-AU/MenuNutrition/Nutrition)

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
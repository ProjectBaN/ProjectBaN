# 프론트

<aside>
✋ 현 관리자 : 이승제 , 김병민

</aside>

### ⚙️ eslint

<aside>
 기본적 prettier 연동과 import오류 설정만 되어있습니다.

</aside>

```jsx
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:import/errors', 'plugin:import/warnings', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
```

### ⚙️ prettier

<aside>
 기본 prettier 설정입니다.

</aside>

```jsx
module.exports = {
  endOfLine: 'lf',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
};
```

## 📚 사용라이브러리

1. Redux - toolkit
2. RouterV6.5
3. styled-components

## 🪜 프로젝트구조

![Untitled](./reaemeAssets/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EA%B5%AC%EC%A1%B0.png)

- **asset → 이미지 폰트 등 스태틱 파일을 저장합니다.**
- **compontnts → 리액트 JSX 파일들이 존재하면 container(데이터받기)→뷰(JSX) 형식을 취하고 있습니다.**
- **pages → 라우터 연결 페이지입니다.**
- **redux → 리덕스관련 폴더이며 reducer, store로 구분되어있습니다.**
- **service → api 호출 관련 로직이 들어있습니다.**
- **styles → styled관련 모듈들이 들어있습니다.**
- **utils → 기타 기능들을 모아 놓은 폴더입니다.**

## 📰 프로젝트 관리 및 설명

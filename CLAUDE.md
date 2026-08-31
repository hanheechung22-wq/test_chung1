# 프로젝트: To-do 웹 앱

## 스택
- Vite + React + TypeScript
- 상태 관리 라이브러리 없이 useState/useEffect만 사용
- 데이터는 localStorage에만 저장 (서버·DB 없음)

## 규칙
- 새 라이브러리를 추가하기 전에 반드시 먼저 물어볼 것
- 컴포넌트는 src/components/ 아래, 파일당 하나
- 코드 설명은 초보자 기준으로, 왜 그렇게 했는지 한 줄씩 덧붙일 것
- 한 번에 기능 하나씩만 구현하고, 다음 단계로 넘어가기 전에 나에게 확인받을 것
- 사용자는 웹 개발 입문자임. 전문 용어를 쓸 때는 짧게 풀어서 설명할 것

## 데이터 구조
type Todo = { id: string; text: string; done: boolean; createdAt: number }

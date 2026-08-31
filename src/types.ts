// 할 일 하나의 모양을 정의합니다.
// 컴포넌트마다 이 모양을 각자 다시 적으면 나중에 어긋나기 쉬워서, 한 곳에 모아두고 공유합니다.
export type Todo = {
  id: string // 같은 글자의 할 일이 여러 개 있어도 구분할 수 있는 고유 번호
  text: string // 할 일 내용
  done: boolean // 완료 여부 (체크박스 상태)
  createdAt: number // 생성 시각(ms) - 나중에 정렬할 때 사용
}

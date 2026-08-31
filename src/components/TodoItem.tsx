import type { Todo } from '../types'

type Props = {
  todo: Todo
  onToggle: (id: string) => void // 이 줄의 체크박스를 눌렀을 때 실행할 함수
}

// 할 일 "한 줄"만 그리는 컴포넌트입니다.
// 목록을 그리는 컴포넌트(TodoList)와 역할을 나누면, 나중에 각 줄의 디자인만 따로 수정하기 쉬워집니다.
function TodoItem({ todo, onToggle }: Props) {
  return (
    <li>
      {/*
        checked는 "지금 체크된 상태인지"를 App이 가진 값으로 정합니다.
        onChange에서 onToggle을 불러 App의 값을 바꾸면, 그 결과로 화면이 다시 그려집니다.
        (readOnly를 빼고 onChange를 넣었기 때문에 이제 실제로 눌립니다.)
      */}
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
      <span>{todo.text}</span>
    </li>
  )
}

export default TodoItem

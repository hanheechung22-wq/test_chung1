import type { Todo } from '../types'

type Props = {
  todo: Todo
}

// 할 일 "한 줄"만 그리는 컴포넌트입니다.
// 목록을 그리는 컴포넌트(TodoList)와 역할을 나누면, 나중에 각 줄의 디자인만 따로 수정하기 쉬워집니다.
function TodoItem({ todo }: Props) {
  return (
    <li>
      {/* 아직 클릭 기능은 없어서 checked만 표시하고, 체크박스는 눌러도 반응하지 않습니다 */}
      <input type="checkbox" checked={todo.done} readOnly />
      <span>{todo.text}</span>
    </li>
  )
}

export default TodoItem

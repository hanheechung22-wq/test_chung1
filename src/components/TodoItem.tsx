import type { Todo } from '../types'

type Props = {
  todo: Todo
  onToggle: (id: string) => void
}

// 할 일 "한 줄"만 그리는 컴포넌트입니다.
// 목록을 그리는 컴포넌트(TodoList)와 역할을 나누면, 나중에 각 줄의 디자인만 따로 수정하기 쉬워집니다.
function TodoItem({ todo, onToggle }: Props) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done} // 화면의 체크 표시는 항상 state의 done 값을 그대로 따라갑니다.
        // 체크박스를 눌러도 스스로 상태를 바꾸지 않습니다. App에게 알려서 state를 바꾸고,
        // 그 결과로 다시 그려지면서 체크 표시가 바뀝니다. (데이터는 항상 한 방향으로 흐릅니다)
        onChange={() => onToggle(todo.id)}
      />
      {/* 완료된 항목이면 취소선 클래스를 붙입니다. 스타일 값은 CSS에 적어두는 편이 관리하기 쉽습니다. */}
      <span className={todo.done ? 'todo-text done' : 'todo-text'}>{todo.text}</span>
    </li>
  )
}

export default TodoItem

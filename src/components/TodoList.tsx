import type { Todo } from '../types'
import TodoItem from './TodoItem'

type Props = {
  todos: Todo[]
}

// 할 일 배열을 받아서 하나씩 TodoItem으로 그려주는 컴포넌트입니다.
function TodoList({ todos }: Props) {
  if (todos.length === 0) {
    // 목록이 비어있을 때 빈 화면 대신 안내 문구를 보여주면 사용자가 헷갈리지 않습니다.
    return <p>할 일이 없습니다.</p>
  }

  return (
    <ul>
      {todos.map((todo) => (
        // key는 리스트 각 항목을 구분하는 용도로 React가 요구하는 값입니다. id를 그대로 씁니다.
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export default TodoList

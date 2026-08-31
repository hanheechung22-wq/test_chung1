import type { Todo } from './types'
import TodoList from './components/TodoList'
import './App.css'

// 아직 "추가" 기능을 만들기 전이라, 화면이 잘 그려지는지 확인용으로 예시 데이터를 직접 넣어둡니다.
// 다음 단계에서 이 부분을 useState + localStorage로 바꿀 예정입니다.
const sampleTodos: Todo[] = [
  { id: '1', text: '리액트 배우기', done: false, createdAt: Date.now() },
  { id: '2', text: '투두 앱 만들기', done: true, createdAt: Date.now() },
]

function App() {
  return (
    <main>
      <h1>To-do</h1>
      <TodoList todos={sampleTodos} />
    </main>
  )
}

export default App

import { useEffect, useState } from 'react'
import type { Todo } from './types'
import TodoList from './components/TodoList'
import './App.css'

// localStorage에 저장할 때 쓰는 "이름표"입니다.
// 저장할 때와 읽을 때 이름이 한 글자라도 다르면 못 찾으므로, 오타를 막으려고 상수로 빼두었습니다.
const STORAGE_KEY = 'todos'

// 아직 "추가" 기능이 없어서, 처음 들어온 사람에게 보여줄 예시 데이터입니다.
// (추가 기능을 만들면 이 부분은 빈 배열로 바꿀 예정입니다.)
const sampleTodos: Todo[] = [
  { id: '1', text: '리액트 배우기', done: false, createdAt: Date.now() },
  { id: '2', text: '투두 앱 만들기', done: true, createdAt: Date.now() },
]

// localStorage에 저장해둔 할 일 목록을 꺼내오는 함수입니다.
// localStorage는 "문자열"만 저장할 수 있어서, 넣을 땐 JSON.stringify로 문자열로 만들고
// 꺼낼 땐 JSON.parse로 다시 배열로 되돌립니다.
function loadTodos(): Todo[] {
  const saved = localStorage.getItem(STORAGE_KEY)

  // 저장된 값이 없으면(= 첫 방문) null이 나옵니다. 이때는 예시 데이터로 시작합니다.
  if (saved === null) return sampleTodos

  try {
    return JSON.parse(saved) as Todo[]
  } catch {
    // 저장된 글자가 깨져 있으면 JSON.parse가 에러를 냅니다.
    // 그대로 두면 화면이 아예 안 뜨기 때문에, 예시 데이터로 되돌려서 앱이 계속 동작하게 합니다.
    return sampleTodos
  }
}

function App() {
  // useState의 초기값 자리에 loadTodos() 대신 loadTodos(함수 그 자체)를 넣었습니다.
  // 이렇게 하면 화면을 다시 그릴 때마다가 아니라, 맨 처음 한 번만 localStorage를 읽습니다.
  const [todos, setTodos] = useState<Todo[]>(loadTodos)

  // useEffect는 "무언가가 바뀐 뒤에 실행할 일"을 적는 곳입니다.
  // 아래 [todos]는 "todos가 바뀔 때만 실행하라"는 뜻이고, 덕분에 체크할 때마다 자동으로 저장됩니다.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // 체크박스를 눌렀을 때 실행할 함수입니다. 누른 줄의 id를 받아서 그 항목의 done만 반대로 뒤집습니다.
  function toggleTodo(id: string) {
    // setTodos에 함수를 넘기면 "가장 최신 목록(prev)"을 받아서 새 목록을 만들 수 있습니다.
    setTodos((prev) =>
      // React는 기존 배열을 직접 고치면 바뀐 걸 알아채지 못합니다.
      // 그래서 map으로 "새 배열"을 만들고, 바꿀 항목만 { ...todo } 복사본에 done을 뒤집어 넣습니다.
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    )
  }

  return (
    <main>
      <h1>To-do</h1>
      {/* 목록과 "체크했을 때 할 일"을 함께 내려보냅니다. 상태는 App이 갖고, 아래 컴포넌트는 알려주기만 합니다. */}
      <TodoList todos={todos} onToggle={toggleTodo} />
    </main>
  )
}

export default App

import { useEffect, useState } from 'react'
import type { Todo } from './types'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import { loadTodos, saveTodos } from './storage'
import './App.css'

// 저장된 값이 하나도 없는 "첫 방문"일 때만 보여줄 예시 데이터입니다.
// 한 번이라도 저장된 뒤에는 이 값 대신 저장된 목록을 불러옵니다.
const initialTodos: Todo[] = [
  { id: '1', text: '리액트 배우기', done: false, createdAt: Date.now() },
  { id: '2', text: '투두 앱 만들기', done: true, createdAt: Date.now() },
]

function App() {
  // 할 일 목록 전체를 App이 state로 들고 있습니다.
  // state가 바뀌면 React가 화면을 자동으로 다시 그려주기 때문에, 화면 갱신을 직접 신경 쓸 필요가 없습니다.
  //
  // useState에 "값" 대신 "함수"를 넘기면, 그 함수는 첫 화면을 그릴 때 딱 한 번만 실행됩니다.
  // 그냥 loadTodos()라고 적으면 화면이 다시 그려질 때마다 매번 읽어서 낭비가 됩니다.
  // ?? 는 앞의 값이 null일 때만 뒤의 값을 쓰라는 뜻입니다.
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos() ?? initialTodos)

  // useEffect는 "화면을 다 그린 뒤에 실행할 일"을 적는 곳입니다.
  // 두 번째 자리의 [todos]는 "todos가 바뀌었을 때만 다시 실행하라"는 뜻입니다.
  // 덕분에 추가/체크 등 목록이 바뀌는 모든 경우를 한 곳에서 처리할 수 있고,
  // 나중에 삭제 기능을 만들어도 저장 코드를 또 적을 필요가 없습니다.
  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  // 새 할 일을 목록 "맨 아래"에 추가합니다.
  function handleAdd(text: string) {
    const newTodo: Todo = {
      // crypto.randomUUID()는 브라우저가 겹치지 않는 고유 문자열을 만들어주는 기능입니다.
      id: crypto.randomUUID(),
      text,
      done: false, // 새로 만든 할 일은 아직 완료가 아니므로 false로 시작합니다.
      createdAt: Date.now(),
    }
    // 기존 배열에 push로 밀어 넣지 않고, [...기존, 새것] 으로 "새 배열"을 만들어 넘깁니다.
    // React는 값이 바뀐 걸 "다른 객체인가?"로 판단해서, 원본을 고치면 화면이 갱신되지 않을 수 있습니다.
    setTodos((prev) => [...prev, newTodo])
  }

  // 체크박스를 눌렀을 때 해당 항목의 done만 반대로 뒤집습니다.
  function handleToggle(id: string) {
    setTodos((prev) =>
      // map은 배열을 하나씩 돌면서 새 배열을 만들어 주는 기능입니다.
      prev.map((todo) =>
        // 누른 항목이면 기존 값을 펼쳐 복사(...todo)한 뒤 done만 반대(!)로 바꾼 새 객체를 만들고,
        // 나머지 항목은 그대로 둡니다.
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  return (
    <main>
      <h1>To-do</h1>
      {/* 자식 컴포넌트는 state를 직접 못 바꾸므로, "바꾸는 함수"를 props로 내려보냅니다. */}
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} />
    </main>
  )
}

export default App

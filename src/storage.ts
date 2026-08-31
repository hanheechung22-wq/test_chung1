import type { Todo } from './types'

// localStorage는 "이름표(key) + 값" 형태로 저장하는 브라우저의 작은 저장소입니다.
// 이름표를 여기저기 문자열로 직접 적으면 오타가 나기 쉬워서, 상수로 한 번만 정해두고 같이 씁니다.
const STORAGE_KEY = 'todos'

// 값이 정말 Todo 모양인지 하나씩 확인하는 함수입니다.
// localStorage 안의 값은 사용자가 개발자 도구로 직접 고칠 수도 있어서, "믿지 말고 확인"하는 편이 안전합니다.
function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false

  // 아래에서 속성을 꺼내 보려고, 타입스크립트에게 "이름표가 붙은 값들의 묶음"이라고 알려줍니다.
  const todo = value as Record<string, unknown>

  return (
    typeof todo.id === 'string' &&
    typeof todo.text === 'string' &&
    typeof todo.done === 'boolean' &&
    typeof todo.createdAt === 'number'
  )
}

// 저장해둔 할 일 목록을 읽어옵니다.
// 저장된 게 없거나 값이 이상하면 null을 돌려주고, 그때는 App이 예시 데이터를 대신 씁니다.
export function loadTodos(): Todo[] | null {
  // 브라우저가 localStorage를 막아둔 경우(시크릿 모드 설정 등)에는 읽기만 해도 에러가 납니다.
  // 그래서 try/catch로 감싸 두면, 에러가 나도 앱이 하얀 화면으로 죽지 않고 예시 데이터로 시작합니다.
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return null // 처음 방문이라 저장된 값이 아직 없는 경우입니다.

    // localStorage에는 문자열만 담을 수 있어서, 저장할 때 JSON 문자열로 바꿨습니다.
    // JSON.parse는 그 문자열을 다시 원래의 배열/객체로 되돌리는 기능입니다.
    const parsed: unknown = JSON.parse(raw)

    // 배열이 아니거나, 항목 중 하나라도 모양이 다르면 통째로 버리고 처음부터 시작합니다.
    if (!Array.isArray(parsed) || !parsed.every(isTodo)) return null

    return parsed
  } catch {
    // 저장된 글자가 깨져서 JSON.parse가 실패한 경우도 여기로 옵니다.
    return null
  }
}

// 할 일 목록을 localStorage에 저장합니다.
export function saveTodos(todos: Todo[]) {
  try {
    // JSON.stringify는 배열/객체를 문자열로 바꿔주는 기능입니다. (JSON.parse의 반대)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch {
    // 저장 공간이 꽉 찼거나 저장이 막힌 경우입니다.
    // 저장은 실패해도 화면은 그대로 잘 동작해야 하므로, 앱을 멈추지 않고 넘어갑니다.
  }
}

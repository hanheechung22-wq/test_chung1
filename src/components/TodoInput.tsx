import { useState } from 'react'

type Props = {
  // 부모(App)가 "할 일이 추가되면 이걸 실행해줘"라고 건네주는 함수입니다.
  // 실제 목록은 App이 가지고 있으므로, 이 컴포넌트는 글자만 받아서 부모에게 넘겨줍니다.
  onAdd: (text: string) => void
}

// 입력창 + "추가" 버튼만 담당하는 컴포넌트입니다.
function TodoInput({ onAdd }: Props) {
  // 입력창에 지금 적혀 있는 글자를 기억하는 state입니다.
  // 화면에 보이는 값과 코드가 아는 값을 하나로 맞추려고(= 제어 컴포넌트) state로 관리합니다.
  const [text, setText] = useState('')

  // 추가 버튼과 Enter 키가 똑같이 동작해야 하므로, 공통 처리를 함수 하나로 모아둡니다.
  function handleAdd() {
    // trim()은 앞뒤 공백을 잘라낸 결과입니다. 공백만 입력한 경우를 걸러내려고 씁니다.
    const trimmed = text.trim()
    if (trimmed === '') return // 빈 값이면 아무 일도 하지 않고 함수를 끝냅니다.

    onAdd(trimmed) // 부모에게 "이 글자로 항목을 추가해줘"라고 알립니다.
    setText('') // 추가한 뒤에는 입력창을 비워서 바로 다음 할 일을 적을 수 있게 합니다.
  }

  return (
    // form으로 감싸면 입력창에서 Enter를 눌렀을 때 브라우저가 알아서 submit을 발생시켜 줍니다.
    <form
      className="todo-input"
      onSubmit={(event) => {
        // form은 기본적으로 페이지를 새로고침하는데, 그러면 화면 상태가 다 사라집니다. 그래서 막아줍니다.
        event.preventDefault()
        handleAdd()
      }}
    >
      <input
        type="text"
        value={text} // state 값을 화면에 보여줍니다.
        onChange={(event) => setText(event.target.value)} // 글자를 칠 때마다 state를 최신 값으로 바꿉니다.
        placeholder="할 일을 입력하세요"
      />
      {/* form 안의 버튼은 기본이 submit이라, 클릭해도 위의 onSubmit이 실행됩니다. */}
      <button type="submit">추가</button>
    </form>
  )
}

export default TodoInput

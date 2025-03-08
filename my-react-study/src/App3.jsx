// TodoList 3: 狀態維護(useState)與事件處理(click)
import './App.css'
import { useState } from 'react'

function App() {

  //const todos = ['吃早餐', '做體操', '寫程式', '辦年貨']
  const [todos, setTodos] = useState(['吃早餐', '做體操', '寫程式', '辦年貨', '發紅包']);

  const [todo, setTodo] = useState('')

  // input 的 onChange 事件處理
  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  // 按下 Add 按鈕要處理的事情
  const handleClick = () => {
    // 使用 concat 來加入新的 todo
    //setTodos(todos.concat(todo));

    // 使用展開運算子來加入新的 todo
    setTodos([...todos, todo])
  };

  return (
    <>
      <h1>My TodoList</h1>
      <div>
        <input type="text" value={todo} onChange={handleChange} />
        <button onClick={handleClick}>Add</button>
      </div>
      <ul>
        {
          todos.map((todo, index) => {
            return (<li key={index}>{todo}</li>)
          })
        }
      </ul>
    </>
  )
}

export default App
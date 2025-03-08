// TodoList 4: todos 的元素轉為物件
import './App.css'
import { useState } from 'react'

function App() {

  const [todos, setTodos] = useState([
    {id: 1, text: '吃早餐', completed: true},
    {id: 2, text: '做體操', completed: false},
    {id: 3, text: '寫程式', completed: true},
    {id: 4, text: '辦年貨', completed: false},
    {id: 5, text: '發紅包', completed: false},
  ]);

  // 用來存放 <input> 的值
  const [todo, setTodo] = useState('')

  // input 的 onChange 事件處理
  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  // 按下 Add 按鈕要處理的事情
  const handleClick = () => {
    if(!todo) return; // 若 todo 無資料則離開此程序
    // 取 id 值 = 目前 todos 的最大 id + 1
    // ...todos.map((t) => t.id) 得到 [1, 2, 3, 4, 5]
    // Math.max([1, 2, 3, 4, 5]) 得到 5
    const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

    const newTodo = {
      id: newId, text: todo, completed: false
    };

    setTodos([...todos, newTodo]);

    setTodo(''); // 將 input 輸入框清空
  };
  // check Todo
  const toggleCompletion = (id) => {
    // 到 todos 找到該筆 id 資訊並將 completion 進行置換
    setTodos(
      // completion 
      todos.map((todo)=> todo.id === id ? {...todo, completed: !todo.completed} : todo)
    )
  }

  // 新增刪除功能的函數
  const handleDelete = (id) => {
    // 過濾掉要刪除的項目，保留其他項目
    setTodos(todos.filter((todo) => todo.id !== id));
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
          todos.map((todo) => {
            return (
              <li key={todo.id}>
                {todo.id}

                <input type="checkbox" 
                checked={todo.completed}
                onChange={() => toggleCompletion(todo.id)}/>

                {todo.text}

                <button onClick={() => handleDelete(todo.id)}>X</button>
                
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default App
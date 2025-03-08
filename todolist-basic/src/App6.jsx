// TodoList 6: 切模組使用 bootstrap
import './App.css'
import { useState, useEffect } from 'react'
import TodoInput from './components/bootstrap/TodoInput'
import TodoList from './components/bootstrap/TodoList'
import 'bootstrap/dist/css/npm install bootstrap.min.css' // 引用 bootstrap

function App() {

  // 初始化 todos，從 localStorage 取得資料
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: 1, text: '吃早餐', completed: true },
      { id: 2, text: '做運動', completed: true },
      { id: 3, text: '寫程式', completed: true },
      { id: 4, text: 'Debug', completed: false },
    ];
  });

  // 每次 todos 更新時，儲存到 localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 用來存放 <input> 的值
  const [todo, setTodo] = useState('')

  // input 的 onChange 事件處理
  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  // 新增 Todo, 按下 Add 按鈕要處理的事情
  const handleClick = () => {
    if(!todo) return; // 若 todo 無資料則離開此程序
    const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

    const newTodo = {
      id: newId, text: todo, completed: false
    };

    setTodos([...todos, newTodo]);

    setTodo(''); // 將 input 輸入框清空
  };

  // 更新 Todo 是否完成
  const toggleCompletion = (id) => {
    // 到 todos 找到該筆 id 資訊並將 completion 進行置換
    setTodos(
      todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo)
    );
  }

  // 刪除 Todo
  const handleDelete = (id) => {
    // 利用 filter 來過濾不需要的資訊
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <>
      <h1>My TodoList</h1>
      <div>
        <TodoInput todo={todo} onChange={handleChange} onClick={handleClick} />
        <TodoList todos={todos} onToggleCompletion={toggleCompletion} onHandleDelete={handleDelete} />
      </div>
    </>
  )
}

export default App
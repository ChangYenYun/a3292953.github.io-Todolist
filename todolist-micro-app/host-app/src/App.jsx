import { useState, useEffect } from "react";
import './App.css';
import TodoInput from "todo_components/TodoInput"
import TodoList from "todo_components/TodoList"
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "todo_components/todoService"

import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap 樣式

function App() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');

    useEffect(() => {
        console.log('抓取 todo list 資料');
        // 獲取代辦事項
        fetchTodos()
            .then(setTodos)
            .catch((error) => console.log('error:', error));
    }, [])

    
    // 新增代辦事項
    const handleAdd = async() => {
        if(!todo) return;
        const newTodo = {text: todo, completed: false};
        try {
            const addedTodo = await addTodo(newTodo);
            setTodos([...todos, addedTodo]);
            setTodo('');
        } catch (error) {
            console.log('add error:', error);
        }
    };

    const handleChange = (e) => {
        setTodo(e.target.value);
    }

    // 更新代辦事項
    const toggleCompletion = async(id) => {
        try {
            // 根據 id 找到要修改的 todo
            const updatedTodo = todos.find((todo) => todo.id === id);
            if(!updatedTodo) return;
            // 變更 completed 狀態
            updatedTodo.completed = !updatedTodo.completed;
            // 調用 updateTodo 方法進行更新
            await updateTodo(updatedTodo);
            // 重新渲染 todos
            setTodos([...todos]);
        } catch (error) {
            console.log('update error:', error);
        }
    };

    // 刪除代辦事項
    const handleDelete = (id) => {
        deleteTodo(id)
            .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
            .catch((error) => console.log('delete error:', error));
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">我的代辦事項</h1>
            <TodoInput todo={todo} onChange={handleChange} onAdd={handleAdd} />
            <TodoList todos={todos} onToggleCompletion={toggleCompletion} onHandleDelete={handleDelete} />
        </div>
    );

}

export default App;
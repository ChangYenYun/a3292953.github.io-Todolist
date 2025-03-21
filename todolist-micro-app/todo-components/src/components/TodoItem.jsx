import React from "react";

const TodoItem = ({todo, onToggleCompletion, onHandleDelete}) => {
    return (
        <li className={`list-group-item d-flex justify-content-between align-items-center 
            ${todo.completed ? 'list-group-item-success' : ''}`}>
                
            {todo.id}

            <input className="me-2" type="checkbox" checked={todo.completed} onChange={() => onToggleCompletion(todo.id)} />

            <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
                {todo.text}
            </span>

            <button className="btn btn-danger btm-sm" onClick={() => onHandleDelete(todo.id)}>X</button>

        </li>
    );

};

export default TodoItem;
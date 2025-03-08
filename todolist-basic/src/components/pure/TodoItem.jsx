const TodoItem = ({todo, onToggleCompletion, onHandleDelete}) => {
    return (
        <li>
            {todo.id}

            <input type="checkbox" 
                checked={todo.completed} 
                onChange={() => onToggleCompletion(todo.id)} />

            {todo.text}

            <button onClick={() => onHandleDelete(todo.id)}>X</button>

        </li>
    )
}

export default TodoItem;

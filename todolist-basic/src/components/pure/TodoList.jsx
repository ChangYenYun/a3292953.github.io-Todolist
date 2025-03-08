import TodoItem from "./TodoItem"

const TodoList = ({todos, onToggleCompletion, onHandleDelete}) => {
    return(
        <ul>
            {
                todos.map((todo) => (
                    <TodoItem key={todo.id}
                              todo={todo}
                              onToggleCompletion={onToggleCompletion}
                              onHandleDelete={onHandleDelete} />
                ))
            }
        </ul>
    )
}

export default TodoList
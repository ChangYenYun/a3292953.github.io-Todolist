const TodoInput = ({todo, onChange, onClick}) => {
    return (
        <div>
            <input type="text" value={todo} onChange={onChange} />
            <button onClick={onClick}>Add</button>
        </div>
    )
}

export default TodoInput;
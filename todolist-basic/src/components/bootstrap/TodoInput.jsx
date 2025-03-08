const TodoInput = ({todo, onChange, onClick}) => {
    return (
        <div className="input-group mb-3">
            <input className="form-control" type="text" value={todo} onChange={onChange} />
            <button className="btn btn-primary" onClick={onClick}>Add</button>
        </div>
    )
}

export default TodoInput;
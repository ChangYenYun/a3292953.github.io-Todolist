import React from "react";

const TodoInput = ({todo, onChange, onAdd}) => {

    return (
        <div>
            <input className="form-control" type="text" onChange={onChange} value={todo} />
            <button className="btn btn-primary" onClick={onAdd}>Add</button>
        </div>
    )

}

export default TodoInput;
// TodoList 3: 狀態維護(useState)與事件處理(click)
import './APP.css'
import { useState } from 'react';

function App(){

const [todos, setTodos] = useState(['吃早餐', '辦年貨', '寫程式', '做體操', '發紅包']);


  return(
    <>
      <h1> TodoList </h1>
      <div>
        <input type='text' />
        <button>Add</button>
      </div>
      <ul>
        {
          todos.map((todo, index)=>{
            return (<li key={index}>{todo}</li>)
          })
        }
        
      </ul>

    </>
  )

}

export default App;
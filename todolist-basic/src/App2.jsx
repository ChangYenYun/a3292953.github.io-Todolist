// TodoList 2
import './APP.css'

function App(){

const todos =['吃早餐', '辦年貨', '寫程式', '做體操'];


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
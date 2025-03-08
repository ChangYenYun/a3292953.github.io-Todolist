// TodoList 2: 陣列處理
import './App.css'

function App() {

  const todos = ['吃早餐', '做體操', '寫程式', '辦年貨']

  return (
    <>
      <h1>My TodoList</h1>
      <div>
        <input type="text" />
        <button>Add</button>
      </div>
      <ul>
        {
          todos.map((todo, index) => {
            return (<li key={index}>{todo}</li>)
          })
        }
      </ul>
    </>
  )
}

export default App

// App.jsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Input from "./components/input";
import List from "./components/List";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Input value={count} onChange={setCount} onSubmit={console.log} />
      <List items={["Learn React", "Learn Vite", "Make an awesome app"]} />
    </>
  );
}

export default App;
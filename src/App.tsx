import Navbar from './component/Navbar'
import Todos from './component/Todos'
import AddTodo from './component/addTodo'
import "./App.css"

const App = () => {
  return (
    <main>
      <h1>
        Todo React App with typescript
      </h1>
      <Navbar />
      <AddTodo />
      <Todos />
    </main>
  )
}

export default App
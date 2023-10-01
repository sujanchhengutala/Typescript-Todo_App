import { Todo, useTodos } from '../store/todos'
import { useSearchParams } from 'react-router-dom'

const Todos = () => {
    const {todos, toggleTodoAsCompleted, handleDeleteTodo } = useTodos()
   const [searchParms] = useSearchParams()
   let todoData = searchParms.get("todos") 
   let newData = todos

   if(todoData==="active"){
    newData = newData.filter((task)=>!task.completed)
   }
   if(todoData==="completed"){
    newData = newData.filter((task)=>task.completed)
   }
  return (
    <>
    <ul className='main-task'>
        {newData.map((curElem:Todo)=>{
            return <li key={curElem.id}>
                <input type='checkbox' id={`todo-${curElem.id}`} checked={curElem.completed} onChange={()=>toggleTodoAsCompleted(curElem.id)} />
                <label htmlFor={`todo-${curElem.id}`} >{curElem.task}</label>
            {curElem.completed && (<button type='submit' onClick={()=>handleDeleteTodo(curElem.id)}>Delete</button>)}
            </li>
        })}
    </ul>
    </>
  )
}

export default Todos
import React, { useState } from 'react'
import { useTodos } from '../store/todos'

const AddTodo = () => {
    const [todo, setTodo]= useState("")
    const {handleAddTodo} = useTodos()
  const handleormSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
handleAddTodo(todo)
setTodo("")
  }
    return (
    <form onSubmit={handleormSubmit}>
        <input type='text' value={todo} onChange={(e)=>setTodo(e.target.value)} />
        <button type='submit'>Submit</button>
    </form>
  )
}

export default AddTodo
import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProvider = {
    children: ReactNode
}
export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}
export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task: string) => void  //call signature
    toggleTodoAsCompleted:(id:string)=>void
   handleDeleteTodo:(id:string)=>void
}

export const todoContext = createContext<TodosContext | null>(null)
export const TodoProvider = ({ children }: TodosProvider) => {
    const [todos, setTodos] = useState<Todo[]>(()=>{
        try{

            const newTodos = localStorage.getItem("todos") || "[]"
            return JSON.parse(newTodos) as Todo[]
        }catch(error){
        return []
        }
    })
    const handleAddTodo = (task: string) => {
        setTodos((prev) => {
            const newTodo: Todo[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            localStorage.setItem("todos", JSON.stringify(newTodo))
            return newTodo

        })
    }
    const toggleTodoAsCompleted = (id:string)=>{
       setTodos((prev)=>{
        let newTodos = prev.map((curElem)=>{
            if(curElem.id === id){
                return {...curElem, completed:!curElem.completed}
            }
            return curElem

        })
        return newTodos
       })
    }
    const handleDeleteTodo =(id:string)=>{
        setTodos((prev)=>{
            let newTodo = prev.filter((currElem)=>currElem.id!=id)
            return newTodo
        })

return
    }

    return <todoContext.Provider value={{ todos, handleAddTodo, toggleTodoAsCompleted,handleDeleteTodo  }}>
        {children}
    </todoContext.Provider>
}
export const useTodos = () => {
    const todosConsumer = useContext(todoContext)
    if (!todosConsumer) {
        throw new Error("useTodos used outside of provider")
    }
    return todosConsumer
}
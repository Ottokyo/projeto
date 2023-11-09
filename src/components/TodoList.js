import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc} from "firebase/firestore";
import "./TodoList.css"
import { async } from "@firebase/util";

function TodoList(){
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    useEffect(()=>{
        const todoCollection = collection(db,"todos");
       onSnapshot(todoCollection,(snapshot) =>{
        const newDate = snapshot.docs.map((doc)=>({
          id:doc.id,
          ...doc.data(),
        }));

        setTodos(newDate);
       })
    },[])

    const handleInputChange = (event) =>{
        setInputValue(event.target.value);
    };

    const handleAddTodos = async() =>{
      if(inputValue !== ""){
        await addDoc(collection(db,"todos"),{text:inputValue,concluido:false})
      }
    };

     const handleToggleChange = async(id) =>{
   
      const todoRef = doc(db, "todos", id);
      const todo = todos.find((todo) => todo.id === id);

      await updateDoc(todoRef,{...todo,concluido:!todo.concluido});

     };

     const handleRemoveTodo = async(id)=>{
        const todoRef = doc(db, "todos", id);
         
        await deleteDoc(todoRef);
       
     };

    return <div>
        <div className="todo-container">
            <h1>TodoList</h1>
            <div className="todo-input">
                <input type="text" placeholder="add tarefa..." value={inputValue} onChange={handleInputChange}/>
                <button onClick={handleAddTodos}>Add</button>
            </div>
            <ul className="todo-list">
                {todos.map((todo)=>(
                  <li className={`todo-item ${todo.concluido == true ? "concluido":""}`} key={todo.id}>
                    <input type="checkbox" onChange={() =>{
                        handleToggleChange(todo.id)
                        }} checked={todo.concluido}/>
                    <span className="todo-text">{todo.text}</span>
                    <button onClick={()=> handleRemoveTodo(todo.id)}>remove</button>
                  </li>  
                ))}
            </ul>
        </div>
    </div>
}


export default TodoList;
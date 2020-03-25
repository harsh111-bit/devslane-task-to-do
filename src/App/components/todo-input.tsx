import * as React from "react";
import shortid from "shortid";
import {ToDoInputInterface, ToDoInterface} from "../../interfaces";
import {useRef, useState} from "react";


const ToDoInput = (prop: ToDoInputInterface) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [inputState, setInputState] = useState('');

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setInputState(event.target.value);
    }

    function handleInputSubmit(event: React.KeyboardEvent) {
       if (event.key === 'Enter') {
           if (!inputState.length) {
               alert("You cannot add an empty task!");
           } else {
               const newToDo: ToDoInterface = {
                   title: inputState,
                   id: shortid.generate(),
                   isCompleted: false,
                   isEdited: false
               };
               prop.handleCreate(newToDo);
               setInputState("");
               if (inputRef && inputRef.current) {
                   inputRef.current.value = '';
               }
           }
       }
       }

    return (
        <div className="toDoInput">
            <input type="text"
                   placeholder="Enter Task To Add"
                   onChange={event => handleInputChange(event)}
                   onKeyPress={event => handleInputSubmit(event)}
                   ref={inputRef}/>
        </div>
    )
    };

export default ToDoInput;

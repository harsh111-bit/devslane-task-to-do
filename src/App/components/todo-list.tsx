import * as React from "react";
import {ToDoListInterface} from "../../interfaces";
import ToDoItem from "./todo-item";

const ToDoList = (prop: ToDoListInterface) => {
    return (
        <div className="todoList">
            <ul>
                {prop.toDos.map((todo) => (
                    <li key={todo.id}>
                        <ToDoItem
                                 toDo={todo}
                                 key={todo.id}
                                 handleCompleted={prop.handleTodoComplete}
                                 handleEdit={prop.handleTodoUpdate}
                                 handleRemove={prop.handleTodoRemove}
                                 />
                    </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ToDoList;

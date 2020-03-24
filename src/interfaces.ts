import * as React from "react";

export interface ToDoInterface {
    title: string,
    id: string,
    isCompleted: boolean,
    isEdited: boolean
}

export interface ToDoItemInterface {
   handleEdit: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void,
   handleRemove: (toDo: ToDoInterface, id: string) => void,
   handleCompleted: (toDo: ToDoInterface, id: string) => void,
   toDo: ToDoInterface
}

export interface ToDoInputInterface {
    toDos: ToDoInterface[],
    handleCreate: (toDo: ToDoInterface) => void
}

export interface ToDoListInterface {
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoRemove: (toDo: ToDoInterface, id: string) => void;
    handleTodoComplete: (toDo: ToDoInterface, id: string) => void;
    toDos: ToDoInterface[];
}



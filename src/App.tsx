import * as React from "react";
import {ToDoInterface} from "./interfaces";
import {useEffect, useState} from "react";
import ToDoInput from "./App/components/todo-input";
import ToDoList from "./App/components/todo-list";
import './App/styles/style.css'
import fireDB from "./fire";
import firebase from "firebase";
import Loader from "react-loader-spinner";


const ToDoApp = () => {

    const [toDos, setToDos] = useState<ToDoInterface[]>([]);
    const [falseToDos, setFalseToDos] = useState<ToDoInterface[]>([]);
    const [toDosFromFirebase, setToDosFromFirebase] = useState<object>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [toDosRemaining, setToDosRemaining] = useState<number>(0);

    useEffect(() => {
            const newToDos = toDos.filter(toDo => !toDo.isCompleted).length;
            setToDosRemaining(newToDos);
        },
        [toDos]);

    useEffect(() => { fireDB
        .database()
        .ref('tasks')
        .on('value', (snapshot: firebase.database.DataSnapshot) => {
            if (snapshot) {
                let loading: boolean = false;
                setIsLoading(loading);
                const fetchedToDos = snapshot.val();
                let toDosFromDatabase: {};
                toDosFromDatabase = snapshot;
                setToDosFromFirebase(toDosFromDatabase);
                 let tasks = [...toDos];
                 snapshot.forEach((task) => {
                     tasks.push( {
                         id: fetchedToDos[String(task.key)].id,
                         isCompleted: fetchedToDos[String(task.key)].isCompleted,
                         isEdited: fetchedToDos[String(task.key)].isEdited,
                         title: fetchedToDos[String(task.key)].title
                     } );
                 });
                setToDos(tasks);
                setFalseToDos(tasks);
            }
        })
    }
        // eslint-disable-next-line
    ,[]
    );

    function handleCreate(todo: ToDoInterface) {
        const newToDosState: ToDoInterface[] = [...toDos];
        const firebaseRef = fireDB.database().ref('tasks');
        firebaseRef.push(todo);
        newToDosState.push(todo);
        console.log(newToDosState);
        setToDos(newToDosState);
    }

    function handleRemove(toDo: ToDoInterface, id: string) {
        console.log(toDos, toDosFromFirebase);
        const newToDosState: ToDoInterface[] = toDos.filter((toDo: ToDoInterface) => toDo.id !== id);
        // @ts-ignore
        toDosFromFirebase.forEach((t) => {
            if (t.val().id === id) {
                const firebaseRef = fireDB.database().ref(`/tasks/${t.key}`);
                firebaseRef.remove().catch();
            }
        });
        setToDos(newToDosState);
    }

    function handleUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
    const newToDosState: ToDoInterface[] = [...toDos];
    newToDosState.find((toDo: ToDoInterface) => toDo.id === id)!.title = event.target.value;
    // @ts-ignore
        toDosFromFirebase.forEach((t) => {
            if (t.val().id === id) {
                const firebaseRef = fireDB.database().ref(`/tasks/${t.key}`);
                firebaseRef.update({ title: event.target.value, isEdited: true}).catch();
            }
        });
    setToDos(newToDosState);
    }

    function handleComplete(toDo: ToDoInterface, id: string) {
     const newToDosState: ToDoInterface[] = [...toDos];
     newToDosState.find((toDo: ToDoInterface) => toDo.id === id)!.isCompleted = !newToDosState.find((todo: ToDoInterface) => todo.id === id)!.isCompleted;
     // @ts-ignore
        toDosFromFirebase.forEach((t) => {
            if (t.val().id === id) {
                const firebaseRef = fireDB.database().ref(`/tasks/${t.key}`);
                firebaseRef.update({isCompleted: true}).catch();
            }
        });
        setToDos(newToDosState);
    }

    function showAllToDos() {
     setToDos(falseToDos);
    }

    function showAllActiveToDos() {
      const newToDos = falseToDos.filter((t) => !t.isCompleted);
        setToDos(newToDos);
    }

    function showAllCompletedToDos() {
        const newToDo = falseToDos.filter((t) => t.isCompleted);
        setToDos(newToDo);
    }

    return (
        <div className="toDoAppList">
            {isLoading ? <Loader type="Circles" color="#2BAD60" /> :
                <>
                <div>
                    <ToDoList handleTodoUpdate={handleUpdate}
                              handleTodoRemove={handleRemove}
                              handleTodoComplete={handleComplete}
                              toDos={toDos}/>

                    <ToDoInput toDos={toDos}
                               handleCreate={handleCreate}/>
                               <div className="remaining">
                                   <p>Remaining Tasks: ({toDosRemaining})</p>
                               </div>
                </div>
                <div className="links">
                <a onClick={() => showAllToDos()}>All</a>
                <a onClick={() => showAllActiveToDos()}>Active</a>
                <a onClick={() => showAllCompletedToDos()}>Completed</a>
                </div>
                </>
                       }

        </div>
    );
};

export default ToDoApp;




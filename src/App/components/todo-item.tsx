import * as React from "react";
import {ToDoItemInterface} from "../../interfaces";

const ToDoItem = (prop: ToDoItemInterface) => {
  return (
      <div className="toDoItem">
          <div onClick={ () => prop.handleCompleted(prop.toDo, prop.toDo.id)}>
              { prop.toDo.isCompleted ?
              <span className="checked">&#10004;</span> :
              <span className="unChecked" />
              }
          </div>
          <div className="toDoItemInput">
              <input type="text"
                     value={prop.toDo.title}
                     onChange={ (event) => prop.handleEdit(event, prop.toDo.id)}
                     />
          </div>

          <div className="itemRemove" onClick={(event) => prop.handleRemove(prop.toDo, prop.toDo.id)}>
              &#9746;
          </div>
      </div>
  );

};

export default ToDoItem;

import { refreshProject ,expandAllToDOInsideProject} from "./dom-manipulate"
import { ToDo } from "./to-do-class"
import {showToDoDialog, handleToDoDialog} from "./dialog"
export class Project{

    constructor(title){
        this.title = title
        this.toDoArray = []
    }
    toDoAtIndex(index){
        return this.toDoArray[index]
    }

    addToDoToArray(toDo){
        this.toDoArray.push(toDo)
    }
    addToDo = () => {
        console.log("Add to do")
        console.log(this.title)
        showToDoDialog(this)
    }
    createToDo(title,desc,date,priority){
        return new ToDo(title,desc,date,priority)
    }
    expand(){
    }
    seeAll=()=>{
        expandAllToDOInsideProject(this)
    }
    delToDo = (e) =>{
        this.toDoArray.forEach(todo => {
            if(todo.title === e.target.parentElement.parentElement.id){
               this.toDoArray.splice(this.toDoArray.indexOf(todo),1)
            }
        });
        refreshProject(this)
    }
    delete = (e) =>{
        this.delete
        e.target.parentElement.parentElement.remove()
    }
    handleInput=(e)=>{
        console.log("inside:")
        console.log(this.title)
        handleToDoDialog(e, this)
    }
}
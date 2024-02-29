import { refreshProject ,expandAllToDOInsideProject,addEventExpendTSeeAllBtn,removeOptionFromProjectSelection} from "./dom-manipulate"
import { ToDo } from "./to-do-class"
import {showToDoDialog, handleToDoDialog} from "./dialog"
export class Project{

    constructor(title){
        this.title = title
        this.toDoArray = []
        this.expand = false
    }
    toDoAtIndex(index){
        return this.toDoArray[index]
    }
    fromNodeElementGetTodo(node){
        let todo;
        this.toDoArray.forEach(element => {
            if(element.title == node.id){
                todo = element
            }
        });
        return todo
    }

    addToDoToArray(toDo){
        this.toDoArray.push(toDo)
    }
    addToDo = () => {
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
    seeFew=()=>{
        this.expand = false
        addEventExpendTSeeAllBtn(this)
        //const seeMoreBtn = document.querySelector(`.see-more-${project.title}`)
        refreshProject(this)
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
        removeOptionFromProjectSelection(this)
        this.delete
        e.target.parentElement.parentElement.remove()
    }
    handleInput=(e)=>{
        handleToDoDialog(e, this)
    }
}


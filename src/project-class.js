import { displayProject } from "./dom-manipulate"
export class Project{

    constructor(title){
        this.title = title
        this.toDoArray = []
    }
    addToDo(toDo){
        this.toDoArray.push(toDo)
    }
    expand(){
    }
    seeAll(){
    }
    delToDo = (e) =>{
        this.toDoArray.forEach(todo => {
            if(todo.title === e.target.parentElement.parentElement.id){
               this.toDoArray.splice(this.toDoArray.indexOf(todo),1)
            }
        });
        displayProject(this)
        
    }
}
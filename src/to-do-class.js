import { collapseToDo, expandToDo, setOpacity, toggleClass } from "./dom-manipulate";

export class ToDo{
    collapse = true;
    check = false
    constructor(title,describe,dueDate,priority){
        this.title = title
        this.describe = describe
        this.dueDate = dueDate
        this.priority = priority
    }
    setCheck = (e) => {
        this.check = !this.check
        if(this.check){
            setOpacity(e.target.parentElement.parentElement.children[0],0.4)
        }
        else{
            setOpacity(e.target.parentElement.parentElement.children[0],1)
        }
        toggleClass(e.target.parentElement.parentElement,"checked")
    }
    expand = (e) => {
        this.collapse = !this.collapse
        if(!this.collapse){
            expandToDo(e.target.parentElement, this)
        }else{
            collapseToDo(e.target.parentElement, this)
        }
    }
    modify(){
    }
}
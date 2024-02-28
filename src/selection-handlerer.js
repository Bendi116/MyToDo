import exp from "constants";
import { projectArray } from ".";
import { displayProject ,removeOptionFromProjectSelection,refreshProject, toDochecked, toDounchecked} from "./dom-manipulate";

export function handleProjectSelection(e){
    const mainProjectContainer = document.querySelector(".main-project-container")
    mainProjectContainer.innerHTML=""

    let options = document.querySelectorAll(".project-option");
    options = Array.from(options)

    for (let i = 0; i < options.length; i++) {
        options[i]
        if (options[i].selected) {
            if(options[i].value == "all"){
                projectArray.forEach(project => {
                    removeOptionFromProjectSelection(project)
                    displayProject(project)
                });
            }
            else{
                projectArray.forEach(project => {
                    if(options[i].value==project.title){
                        displayProject(project)
                    }
                });
                }    
        }
    }
    
    
    
}


export function handleToDoCheckedSelection(e){
    let options = document.querySelectorAll(".to-do-checked-option");
    options = Array.from(options)

    for (let i = 0; i < options.length; i++) {
        if(options[i].selected){
            if(options[i].value == "all"){
                toDochecked = false
                toDounchecked = false
                projectArray.forEach(project=>{
                    refreshProject(project)
                })
            }else if(options[i].value == "checked"){
                toDochecked = true
                toDounchecked = false
            }
            else if(options[i].value == "unchecked"){
                toDounchecked = true
                toDochecked = false
            }
        }
        
    }
}

export function handleToDoPrioritySelection(e){
    let options = document.querySelectorAll(".to-do-priority-option");
    options = Array.from(options)

    for (let i = 0; i < options.length; i++) {
        if(options[i].selected){
            console.log(options[i])
        }
        
    }
}

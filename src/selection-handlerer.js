import { projectArray } from ".";
import { displayProject ,removeOptionFromProjectSelection} from "./dom-manipulate";

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
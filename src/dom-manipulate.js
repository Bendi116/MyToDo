import { toDoArraySort, } from "./to-do-class"
import {format} from "date-fns"
import { showToDoModifyDialog } from "./dialog";
//logic variables
let toDoChecked = false;
let toDoUnChecked = false;

export let priorityObject = {
    "high":false,
    "medium":false,
    "low":false
}



export function adjustChecked(bool1,bool2){
    toDoChecked = bool1
    toDoUnChecked = bool2
}

export function adjustPriority(bool1,bool2,bool3){
    priorityObject["high"] = bool1
    priorityObject["medium"] = bool2
    priorityObject["low"] = bool3
}

export function displayProject(project){
    //const
    const mainProjectContainer = document.querySelector(".main-project-container")
    const  projectMainDiv = document.createElement("div")
   
    const projectHeader = document.createElement("div")
    const projectContainer = document.createElement("div")
    const projectAddToDoBtn = document.createElement("button")
    const projectDelBtn = document.createElement("button")
    const projectBtnDiv = document.createElement("div")
    const seeMoreBtn = document.createElement("button")

    //sort and add todo div's
    project.toDoArray = toDoArraySort(project.toDoArray)

    //add id and class
    projectMainDiv.id = `project-${project.title}`
    projectMainDiv.classList.add("project")
    projectContainer.classList.add("project-container")
    projectBtnDiv.classList.add("project-btn-container")
    seeMoreBtn.classList.add(`see-more-${project.title}`)

    //inner text
    projectHeader.innerText = project.title
    projectAddToDoBtn.innerText = "Add"
    projectDelBtn.innerText = "Del"
    seeMoreBtn.innerText = "--- See More ---"

    //add event listener
    projectAddToDoBtn.addEventListener("click", project.addToDo)
    projectDelBtn.addEventListener("click", project.delete)
    seeMoreBtn.addEventListener("click", project.seeAll, {once: true})

    //append childs
    projectBtnDiv.appendChild(projectDelBtn)
    projectBtnDiv.appendChild(projectAddToDoBtn)

    projectMainDiv.appendChild(projectHeader)
    projectMainDiv.appendChild(projectContainer)
    projectMainDiv.appendChild(projectBtnDiv)
    projectMainDiv.appendChild(seeMoreBtn)
    
    mainProjectContainer.appendChild(projectMainDiv)

    refreshToDoClass(projectMainDiv,project)

    if(!projectInSelection(project))
    {
        addOptionToProjectSelection(project)
    }

    refreshProject(project)
    
}

function refreshToDoClass(projectMainDiv,project){
    const toDosArray =Array.from(projectMainDiv.children[1].children)
    toDosArray.forEach(toDoNode=>{
        let todo = project.fromNodeElementGetTodo(toDoNode)
        if(todo.check){
            toggleClass(toDoNode.children[0],"checked")
        }
    })
}

export function refreshProject(project){
    const projectMainDiv = document.querySelector(`#project-${project.title}`)
    projectMainDiv.children[1].innerHTML = ""
    project.toDoArray  = toDoArraySort(project.toDoArray)
    let treshold = project.toDoArray.length < 3 ? project.toDoArray.length : 3
    let i = 0
   
    let canAdd = true
    project.toDoArray.forEach(todo=>{
        if(canAdd){

            if(toDoChecked && priorityObject["high"]){
                if(todo.check && todo.priority == 1){
                    projectMainDiv.children[1].appendChild(displayToDo(todo,project))
                    i++
                }
            }

            else if(toDoChecked && priorityObject["medium"]){
                if(todo.check && todo.priority == 0){
                    projectMainDiv.children[1].appendChild(displayToDo(todo,project))
                    i++
                }
            }
            else if(toDoChecked && priorityObject["low"]){
                if(todo.check && todo.priority == -1){
                    projectMainDiv.children[1].appendChild(displayToDo(todo,project))
                    i++
                }
            }

            else if(toDoUnChecked && priorityObject["high"]){
                if(!todo.check && todo.priority == 1){
                    projectMainDiv.children[1].appendChild(displayToDo(todo,project))
                    i++
                }
            }

            else if(toDoUnChecked && priorityObject["medium"]){
                if(!todo.check && todo.priority == 0){
                    projectMainDiv.children[1].appendChild(displayToDo(todo,project))
                    i++
                }
            }
            else if(toDoUnChecked && priorityObject["low"]){
                if(!todo.check && todo.priority == -1){
                    projectMainDiv.children[1].appendChild(displayToDo(todo,project))
                    i++
                }
            }

            else if(toDoChecked){
                if(todo.check){
                    projectMainDiv.children[1].appendChild(displayToDo(todo,project))
                    i++
                }
            }
            else if(toDoUnChecked){
                if(!todo.check){
                    projectMainDiv.children[1].appendChild(displayToDo(todo,project))
                    i++
                }
            }
            else if(priorityObject["high"]){
                if(todo.priority == 1){
                    projectMainDiv.children[1].appendChild(displayToDo(todo,project))
                    i++
                }
            }
            else if(priorityObject["medium"]){
                if(todo.priority == 0){
                    projectMainDiv.children[1].appendChild(displayToDo(todo,project))
                    i++
                }
            }
            else if(priorityObject["low"]){
                if(todo.priority == -1){
                    projectMainDiv.children[1].appendChild(displayToDo(todo,project))
                    i++
                }
            }

    
            else{
                projectMainDiv.children[1].appendChild(displayToDo(todo,project))     
                i++
            }
        }
      
        if(i>=treshold){
            canAdd = false
        }
    })

    
    refreshToDoClass(projectMainDiv,project)
    
    if(project.expand){expandAllToDOInsideProject(project)}        
}

export function expandAllToDOInsideProject(project){
    project.expand = true
    const projectMainDiv = document.querySelector(`#project-${project.title}`)
    const seeMoreBtn = document.querySelector(`.see-more-${project.title}`)

    seeMoreBtn.addEventListener("click", project.seeFew, {once: true})

    projectMainDiv.children[1].innerHTML = ""
    toDoArraySort(project.toDoArray)
    project.toDoArray.forEach(todo => {
        if(toDoChecked){
            if(todo.check){
                projectMainDiv.children[1].appendChild(displayToDo(todo,project))
            }} 
        else if(toDoUnChecked){
            if(!todo.check){
                projectMainDiv.children[1].appendChild(displayToDo(todo,project))
            }
            }
        else{
            projectMainDiv.children[1].appendChild(displayToDo(todo,project))
            }
          
    });
    refreshToDoClass(projectMainDiv,project)
}

export function addEventExpendTSeeAllBtn(project){
    const seeMoreBtn = document.querySelector(`.see-more-${project.title}`)
    seeMoreBtn.addEventListener("click", project.seeAll, {once: true})
}

export function displayToDo(todo,project){
    //const
    const todoContainer = document.createElement("div")
    const toDoContent = document.createElement("div")
    const title = document.createElement("p")
    const dueDate = document.createElement("p")
    const btnContainer = document.createElement("div")
    const toDoCheckBtn = document.createElement("button")
    const toDoModifyBtn = document.createElement("button")
    const toDoDelBtn = document.createElement("button")
    const expandBtn = document.createElement("button")

    //set innerText
    title.innerText = todo.title
    dueDate.innerText = todo.dueDate?format(todo.dueDate,"y:L:d H:m"):""
    toDoModifyBtn.innerText = "Mod"
    toDoCheckBtn.innerText = "Check"
    toDoDelBtn.innerText = "Del"
    expandBtn.innerText = "ˇ"
    

    //add event listeners
    toDoCheckBtn.addEventListener("click", todo.setCheck)
    toDoModifyBtn.addEventListener("click",showToDoModifyDialog)
    toDoDelBtn.addEventListener("click", project.delToDo)
    expandBtn.addEventListener("click", todo.expand)

    //set id and classes
    todoContainer.id = todo.title
    todoContainer.classList.add("to-do")
    title.classList.add("title")
    dueDate.classList.add("due-date")
    btnContainer.classList.add("btn-container")
    toDoModifyBtn.classList.add("modify-btn")
    expandBtn.classList.add("expand-btn")
    toDoContent.classList.add("to-do-content")
    toDoContent.classList.add(`priority-${todo.priority}`)

    

    

    //append childs 
    toDoContent.appendChild(title)
    toDoContent.appendChild(dueDate)
    toDoContent.appendChild(toDoModifyBtn)
    toDoContent.appendChild(expandBtn)

    btnContainer.appendChild(toDoCheckBtn)
    btnContainer.appendChild(toDoDelBtn)

    todoContainer.appendChild(toDoContent)
    todoContainer.appendChild(btnContainer)

    return todoContainer


}

export function addOptionToProjectSelection(project){
    const selection = document.querySelector("#project-select")
    const newOption = document.createElement("option")

    newOption.innerText = project.title
    newOption.value = project.title

    newOption.id = `option-${project.title}`
    newOption.classList.add("project-option")

    selection.appendChild(newOption)
}
export function removeOptionFromProjectSelection(project){
    const currOption = document.querySelector(`#option-${project.title}`)
  
    currOption.remove()
}

export function expandToDo(todoHtml,todo){
    const describe = document.createElement("p")

    //set innerText
    describe.innerText = todo.describe

    //set id and classes
    todoHtml.classList.toggle("expand")
    describe.classList.add("to-do-desc")

    //append child
    todoHtml.insertBefore(describe, todoHtml.children[2])
}

export function collapseToDo(todoHtml,todo){
    //set id and classes
    todoHtml.classList.toggle("expand")

    //append child
    todoHtml.removeChild(todoHtml.children[2])
}


export function setOpacity(node, opacity){
    node.style.opacity = opacity
}

export function toggleClass(node, className){
    node.classList.toggle(className)
}

function projectInSelection(project){
    let options = document.querySelectorAll(".project-option");
    options = Array.from(options)

    for (let i = 0; i < options.length; i++) {
        
        if(options[i].value == project.title){
            return true
        }
    }
    return false
}

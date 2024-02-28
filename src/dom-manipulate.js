import { toDoArraySort } from "./to-do-class"
import {format} from "date-fns"

export function displayProject(project){
    //const
    const mainContainer = document.querySelector(".main-container")
    const  projectMainDiv = document.createElement("div")
   
    const projectHeader = document.createElement("div")
    const projectContainer = document.createElement("div")
    const projectAddToDoBtn = document.createElement("button")
    const projectDelBtn = document.createElement("button")
    const projectBtnDiv = document.createElement("div")
    const seeMoreBtn = document.createElement("button")

    //sort and add todo div's
    project.toDoArray = toDoArraySort(project.toDoArray)

    let treshold = project.toDoArray.length < 3 ? project.toDoArray.length : 3
    for (let i = 0; i < treshold ;i++) {
        projectContainer.appendChild(displayToDo(project.toDoAtIndex(i),project))
    }
   

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
    
    mainContainer.appendChild(projectMainDiv)
    
}

export function refreshProject(project){
    const projectMainDiv = document.querySelector(`#project-${project.title}`)
    projectMainDiv.children[1].innerHTML = ""
    project.toDoArray  = toDoArraySort(project.toDoArray)
    let treshold = project.toDoArray.length < 3 ? project.toDoArray.length : 3
    for (let i = 0; i < treshold ;i++) {
        projectMainDiv.children[1].appendChild(displayToDo(project.toDoAtIndex(i),project))
    }
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
        projectMainDiv.children[1].appendChild(displayToDo(todo,project))
    });
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
    const toDoDelBtn = document.createElement("button")
    const expandBtn = document.createElement("button")

    //set innerText
    title.innerText = todo.title
    dueDate.innerText = todo.dueDate?format(todo.dueDate,"y:L:d H:m"):""
    toDoCheckBtn.innerText = "Check"
    toDoDelBtn.innerText = "Del"
    expandBtn.innerText = "ˇ"
    

    //add event listeners
    toDoCheckBtn.addEventListener("click", todo.setCheck)
    toDoDelBtn.addEventListener("click", project.delToDo)
    expandBtn.addEventListener("click", todo.expand)

    //set id and classes
    todoContainer.id = todo.title
    todoContainer.classList.add("to-do")
    title.classList.add("title")
    dueDate.classList.add("due-date")
    btnContainer.classList.add("btn-container")
    expandBtn.classList.add("expand-btn")
    toDoContent.classList.add("to-do-content")
    toDoContent.classList.add(`priority-${todo.priority}`)


    //append childs 
    toDoContent.appendChild(title)
    toDoContent.appendChild(dueDate)
    toDoContent.appendChild(expandBtn)

    btnContainer.appendChild(toDoCheckBtn)
    btnContainer.appendChild(toDoDelBtn)

    todoContainer.appendChild(toDoContent)
    todoContainer.appendChild(btnContainer)

    return todoContainer


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


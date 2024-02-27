
export function displayProject(project){
    //const
    const mainContainer = document.querySelector(".main-container")
    let projectMainDiv;
    let hasExit = false
    if(document.querySelector(`#project-${project.title}`)){
        projectMainDiv = document.querySelector(`#project-${project.title}`)
        projectMainDiv.innerHTML = "";
        hasExit = true
    }
    else{
        projectMainDiv = document.createElement("div")
    }
    const projectHeader = document.createElement("div")
    const projectContainer = document.createElement("div")
    const projectAddToDoBtn = document.createElement("button")
    const projectDelBtn = document.createElement("button")
    const projectBtnDiv = document.createElement("div")
    const seeMoreBtn = document.createElement("button")

    //add todo div's
    let treshold = project.toDoArray.length < 3 ? project.toDoArray.length : 3
    for (let i = 0; i < treshold ;i++) {
        projectContainer.appendChild(displayToDo(project.toDoAtIndex(i),project))
    }
   

    //add id and class
    projectMainDiv.id = `project-${project.title}`
    projectMainDiv.classList.add("project")
    projectContainer.classList.add("project-container")
    projectBtnDiv.classList.add("project-btn-container")
    seeMoreBtn.classList.add("seeMore")

    //inner text
    projectHeader.innerText = project.title
    projectAddToDoBtn.innerText = "Add"
    projectDelBtn.innerText = "Del"
    seeMoreBtn.innerText = "--- See More ---"

    //add event listener
    console.log("Inside display")
    console.log(project)
    projectAddToDoBtn.addEventListener("click", project.addToDo)
    projectDelBtn.addEventListener("click", project.delete)
    seeMoreBtn.addEventListener("click", project.seeAll)

    //append childs
    projectBtnDiv.appendChild(projectDelBtn)
    projectBtnDiv.appendChild(projectAddToDoBtn)

    projectMainDiv.appendChild(projectHeader)
    projectMainDiv.appendChild(projectContainer)
    projectMainDiv.appendChild(projectBtnDiv)
    projectMainDiv.appendChild(seeMoreBtn)
    if(!hasExit){
        mainContainer.appendChild(projectMainDiv)
    }
}
export function expandAllToDOInsideProject(project){
    const projectMainDiv = document.querySelector(`#project-${project.title}`)

    console.log("project children")
    projectMainDiv.children[1].innerHTML = ""

    project.toDoArray.forEach(todo => {
        projectMainDiv.children[1].appendChild(displayToDo(todo,project))
    });
    console.log(project.toDoArray)
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
    dueDate.innerText = todo.dueDate
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


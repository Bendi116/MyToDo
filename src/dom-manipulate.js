export function displayProject(project){
    //const
    const mainContainer = document.querySelector(".main-container")
    let projectMainDiv;
    if(document.querySelector(`#project-${project.title}`)){
        projectMainDiv = document.querySelector(`#project-${project.title}`)
        projectMainDiv.innerHTML = "";
    }
    else{
        projectMainDiv = document.createElement("div")
    }
    const projectHeader = document.createElement("div")
    const projectContainer = document.createElement("div")
    const projectAddToDoBtn = document.createElement("button")

    //add todo div's
    projectHeader.innerText = project.title
    project.toDoArray.forEach(todo => {
        projectContainer.appendChild(displayToDo(todo,project))
    });

    //add id and class
    projectMainDiv.id = `project-${project.title}`
    projectMainDiv.classList.add("project")
    projectContainer.classList.add("project-container")

    //inner text
    projectAddToDoBtn.innerText = "Add"

    //append childs
    projectMainDiv.appendChild(projectHeader)
    projectMainDiv.appendChild(projectAddToDoBtn)
    projectMainDiv.appendChild(projectContainer)
    mainContainer.appendChild(projectMainDiv)

}

export function displayToDo(todo,project){
    //const
    const todoContainer = document.createElement("div")
    const title = document.createElement("p")
    const describe = document.createElement("p")
    const btnContainer = document.createElement("div")
    const toDoCheckBtn = document.createElement("button")
    const toDoDelBtn = document.createElement("button")

    //set innerText
    title.innerText = todo.title
    describe.innerText = todo.describe
    toDoCheckBtn.innerText = "Check"
    toDoDelBtn.innerText = "Del"

    //add event listeners
    toDoDelBtn.addEventListener("click", project.delToDo)

    //set id and classes
    todoContainer.id = todo.title
    todoContainer.classList.add("to-do")
    btnContainer.classList.add("btn-container")

    //append childs 
    todoContainer.appendChild(title)
    todoContainer.appendChild(describe)

    btnContainer.appendChild(toDoCheckBtn)
    btnContainer.appendChild(toDoDelBtn)

    todoContainer.appendChild(btnContainer)

    return todoContainer


}
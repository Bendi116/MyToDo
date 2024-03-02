import { displayProject, refreshProject,addOptionToProjectSelection,priorityObject } from "./dom-manipulate"
import { Project ,fromNodeElemenetGetProject,fromNameGetProject} from "./project-class"
import { projectArray } from "."
import { allSelected } from "./selection-handlerer"
import {format} from "date-fns"


const toDoDialog = document.querySelector("#to-do-dialog")
const titleInput = document.querySelector("#title-input")
const describeInput = document.querySelector("#describe-input")
const dateInput = document.querySelector("#date-input")
const priorityInput = document.querySelector("#priority-input")
const once = {
    once: true,
  };

const projectDialog = document.querySelector("#project-dialog")
const projectTitleInput = document.querySelector("#project-title")

const toDoModDialog = document.querySelector("#to-do-mod-dialog")
const titleModCurrentInput = document.querySelector("#title-mod-current-input")
const describeModCurrentInput = document.querySelector("#describe-mod-current-input")
const dateModCurrentInput = document.querySelector("#date-mod-current-input")
const priorityModCurrentInput = document.querySelector("#priority-mod-current-input")
const titleModInput = document.querySelector("#title-mod-input")
const describeModInput = document.querySelector("#describe-mod-input")
const dateModInput = document.querySelector("#date-mod-input")
const priorityModInput = document.querySelector("#priority-mod-input")

const toDoGlobalDialog = document.querySelector("#to-do-global-dialog")
const projectGlobalInput = document.querySelector("#project-global-select")
const titleGlobalInput = document.querySelector("#title-global-input")
const describeGlobalInput = document.querySelector("#describe-global-input")
const dateGlobalInput = document.querySelector("#date-global-input")
const priorityGlobalInput = document.querySelector("#priority-global-input")
const submitToDoGlobalBtn = document.querySelector("#submit-to-do-global-btn")
let globalProject

export function showToDoGlobalDialog(){
    projectGlobalInput.innerHTML = ""
    let first = true

    projectArray.forEach(project=>{
        const option = document.createElement("option")
        option.innerText = project.title
        option.value = project.title
        if(first){
            option.selected = true
            first = false
        }
        projectGlobalInput.appendChild(option)
    })
    Array.from(projectGlobalInput).forEach(option=>{
        if(option.selected)
        {globalProject = fromNameGetProject(option.value)
         }
    })

    projectGlobalInput.addEventListener("change",getProject)
    submitToDoGlobalBtn.addEventListener("click",globalProject.handleGlobalInput,once)

    toDoGlobalDialog.showModal()
    
    
}
function getProject(e){
    submitToDoGlobalBtn.removeEventListener("click",globalProject.handleGlobalInput,once)
    globalProject = fromNameGetProject(e.target.value)
    submitToDoGlobalBtn.addEventListener("click",globalProject.handleGlobalInput,once)
}



export function showProjectDialog(){
    const projectSubmitBtn = document.querySelector("#submit-project-btn")
    projectDialog.showModal()
    projectSubmitBtn.addEventListener("click",(e)=>{
        e.preventDefault()
        const newProject = new Project(projectTitleInput.value)
        projectArray.push(newProject)
        if (allSelected){displayProject(newProject)}
        else{addOptionToProjectSelection(newProject)}
        projectTitleInput.value=""
        projectDialog.close()
    },once
    )

}
export function showToDoDialog(project){
    
    const toDoSubmitBtn = document.querySelector("#submit-to-do-btn")
    toDoDialog.showModal()
    toDoSubmitBtn.addEventListener("click", project.handleInput, once)
 
    
}

export function handleToDoDialog(event, project){
    event.preventDefault() 
    project.addToDoToArray(project.createToDo(titleInput.value, describeInput.value,dateInput.value?new Date(dateInput.value):null, parseInt(priorityInput.value)))
    refreshProject(project)
    clearToDoDialog()
    toDoDialog.close() 
    
}
export function handleToDoGlobalDialog(event,project){
    event.preventDefault() 
    project.addToDoToArray(project.createToDo(titleGlobalInput.value, describeGlobalInput.value,dateGlobalInput.value?new Date(dateGlobalInput.value):null, parseInt(priorityGlobalInput.value)))
    refreshProject(project)
    clearToDoGlobalDialog()
    toDoGlobalDialog.close() 
}

export function showToDoModifyDialog(e){
    const toDOModBtn = document.querySelector("#submit-to-do-mod-btn")
    const toDoModCloseBtn = document.querySelector("#close-to-do-mod-btn")
    let project = fromNodeElemenetGetProject(e.target.parentElement.parentElement.parentElement.parentElement)
    let todo = project.fromNodeElementGetTodo(e.target.parentElement.parentElement)
    titleModCurrentInput.innerText += todo.title
    describeModCurrentInput.innerText += todo.describe
    dateModCurrentInput.innerText += format(todo.priority,"y:L:d H:m")
    priorityModCurrentInput.innerText += todo.priority

    titleModCurrentInput.innerText = "Current Todo Title: "
    describeModCurrentInput.innerText ="Current Todo Desc: "
    dateModCurrentInput.innerText = "Current Todo Date: "
    priorityModCurrentInput.innerText = "Current Todo priority: "



    titleModInput.value =""
    describeModInput.value = ""
    dateModInput.value = ""
        
    titleModInput.placeholder = todo.title
    describeModInput.placeholder = todo.describe
    dateModInput.placeholder = format(todo.priority,"y:L:d H:m")
    priorityModInput.placeholder = todo.priority

    let modOptions = document.querySelectorAll('.mod-option')
    modOptions = Array.from(modOptions)
    modOptions.forEach(modOption=>{
        if(modOption.value == todo.priority){
            modOption.selected = true
        }
    }
        )

    toDoModDialog.showModal()
    
    toDOModBtn.addEventListener("click",(e)=>{
        e.preventDefault()
        if(titleModInput.value != ""){
            todo.title = titleModInput.value
        }
        if(describeModInput.value != ""){
            todo.describe = describeModInput.value
        }
        if(dateModInput.value != ""){
            todo.dueDate = dateModInput.value
        }
        if(parseInt(priorityModInput.value)!= todo.priority){
            todo.priority = parseInt(priorityModInput.value)
        }
        refreshProject(project)
       
        toDoModDialog.close()
    },once
    )
}

function clearToDoDialog(){
    titleInput.value = ""
    describeInput.value = ""
    dateInput.value = ""
}

function clearToDoGlobalDialog(){
    titleGlobalInput.value = ""
    describeGlobalInput.value = ""
    dateGlobalInput.value =""
}
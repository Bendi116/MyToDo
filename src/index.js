import "./style.css";
import { showProjectDialog, showToDoGlobalDialog } from "./dialog";
import {
  handleProjectSelection,
  handleToDoCheckedSelection,
  handleToDoPrioritySelection,
} from "./selection-handlerer";
import Icon from "./to-do-icon.png";
import { loadAllFromStorage } from "./handleStorage";

const addProjectBtn = document.querySelector("#add-project");
const addToDoBtn = document.querySelector("#add-to-do-global");
const projectSelector = document.querySelector("#project-select");
const toDoCheckedSelector = document.querySelector("#to-do-checked-select");
const toDoPrioritySelector = document.querySelector("#to-do-priority-select");

const header = document.querySelector("header");
const headerIcon = new Image();
headerIcon.src = Icon;
header.appendChild(headerIcon);

export const projectArray = [];

addProjectBtn.addEventListener("click", showProjectDialog);
addToDoBtn.addEventListener("click", showToDoGlobalDialog);
projectSelector.addEventListener("change", handleProjectSelection);
toDoCheckedSelector.addEventListener("change", handleToDoCheckedSelection);
toDoPrioritySelector.addEventListener("change", handleToDoPrioritySelection);

loadAllFromStorage();

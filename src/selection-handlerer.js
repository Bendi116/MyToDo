import { projectArray } from ".";
import {
  displayProject,
  removeOptionFromProjectSelection,
  refreshProject,
  adjustChecked,
  adjustPriority,
} from "./dom-manipulate";
export let allSelected = true;

export function handleProjectSelection() {
  const mainProjectContainer = document.querySelector(
    ".main-project-container"
  );
  mainProjectContainer.innerHTML = "";

  let options = document.querySelectorAll(".project-option");
  options = Array.from(options);

  for (let i = 0; i < options.length; i++) {
    options[i];
    if (options[i].selected) {
      if (options[i].value == "all") {
        projectArray.forEach((project) => {
          allSelected = true;
          removeOptionFromProjectSelection(project);
          displayProject(project);
          project.display = true;
        });
      } else {
        projectArray.forEach((project) => {
          if (options[i].value == project.title) {
            allSelected = false;
            displayProject(project);
            project.display = true;
          } else {
            project.display = false;
          }
        });
      }
    }
  }
}

export function handleToDoCheckedSelection() {
  let options = document.querySelectorAll(".to-do-checked-option");
  options = Array.from(options);
  for (let i = 0; i < options.length; i++) {
    if (options[i].selected) {
      if (options[i].value == "all") {
        adjustChecked(false, false);
      } else if (options[i].value == "checked") {
        adjustChecked(true, false);
      } else if (options[i].value == "unchecked") {
        adjustChecked(false, true);
      }
    }
  }
  projectArray.forEach((project) => {
    if (allSelected) {
      refreshProject(project);
    } else if (project.display) {
      refreshProject(project);
    }
  });
}

export function handleToDoPrioritySelection() {
  let options = document.querySelectorAll(".to-do-priority-option");
  options = Array.from(options);

  for (let i = 0; i < options.length; i++) {
    if (options[i].selected) {
      if (options[i].value == "all") {
        adjustPriority(false, false, false);
      } else if (options[i].value == "high") {
        adjustPriority(true, false, false);
      } else if (options[i].value == "medium") {
        adjustPriority(false, true, false);
      } else if (options[i].value == "low") {
        adjustPriority(false, false, true);
      }
    }
  }
  projectArray.forEach((project) => {
    if (allSelected) {
      refreshProject(project);
    } else if (project.display) {
      refreshProject(project);
    }
  });
}

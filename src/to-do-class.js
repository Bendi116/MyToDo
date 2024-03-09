import {
  collapseToDo,
  expandToDo,
  toggleClass,
  refreshProject,
} from "./dom-manipulate";
import { fromNodeElemenetGetProject } from "./project-class";
import { isAfter } from "date-fns";

export class ToDo {
  collapse = true;

  constructor(title, describe, dueDate, priority, check = false) {
    this.title = title;
    this.describe = describe;
    this.dueDate = dueDate;
    this.priority = priority;
    this.check = check;
  }
  setCheck = (e) => {
    this.check = !this.check;
    toggleClass(e.target.parentElement.parentElement.children[0], "checked");
    refreshProject(
      fromNodeElemenetGetProject(
        e.target.parentElement.parentElement.parentElement.parentElement
      )
    );
  };
  expand = (e) => {
    this.collapse = !this.collapse;
    if (!this.collapse) {
      expandToDo(e.target.parentElement, this);
    } else {
      collapseToDo(e.target.parentElement, this);
    }
  };
  modify() {}
}

export function toDoArraySort(array) {
  let temp;

  for (let i = array.length - 1; i >= 0; i--) {
    for (let j = 1; j < array.length; j++) {
      if (array[j - 1].priority < array[j].priority) {
        temp = array[j - 1];
        array[j - 1] = array[j];
        array[j] = temp;
      } else if (
        isAfter(
          array[j - 1].dueDate ? array[j - 1].dueDate : new Date(0),
          array[j].dueDate ? array[j].dueDate : new Date(0)
        ) &&
        array[j - 1].priority === array[j].priority
      ) {
        temp = array[j - 1];
        array[j - 1] = array[j];
        array[j] = temp;
      }
    }
  }
  return array;
}

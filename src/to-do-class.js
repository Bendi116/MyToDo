export class ToDo{
    constructor(title,describe,dueDate,priority,check){
        this.title = title
        this.describe = describe
        this.dueDate = dueDate
        this.priority = priority
        this.check = check
    }
    check() {
        this.check = !this.check
    }
    expand(){
    }
    modify(){
    }
}
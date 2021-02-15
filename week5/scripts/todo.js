
export class ToDo {
    constructor(content) {
        this.Id = Date.now();
        this.Content = content;
        this.Completed = false;
    }
}
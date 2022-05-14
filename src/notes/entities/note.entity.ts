export class Note {
    
    id: number;
    userId: number;
    title: string;
    content: string;

    constructor(id: number, userId: number, title: string = "", content: string = "") {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
}

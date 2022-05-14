import { ApiProperty } from "@nestjs/swagger";

export class Note {
    @ApiProperty({ description: "Note identifier", nullable: false })
    id: number;

    @ApiProperty({ description: "User identifier", nullable: true })
    userId: number;
    
    @ApiProperty({ description: "Note title", nullable: true })
    title: string;
    
    @ApiProperty({ description: "Note content", nullable: true })
    content: string;

    constructor(id: number, userId: number, title: string = "", content: string = "") {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
}

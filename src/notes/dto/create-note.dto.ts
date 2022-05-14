import { ApiProperty } from "@nestjs/swagger";

export class CreateNoteDto {
    @ApiProperty({ description: "Note title", nullable: true })
    title: string;
    
    @ApiProperty({ description: "Note content", nullable: true })
    content: string;
}

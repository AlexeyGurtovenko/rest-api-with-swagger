import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
    @ApiProperty({ description: "Note title", nullable: true })
    title: string;
    
    @ApiProperty({ description: "Note content", nullable: true })
    content: string;
}

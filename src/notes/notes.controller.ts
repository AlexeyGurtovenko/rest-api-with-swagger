import { 
  Controller, Get, Post, 
  Body, Patch, Param, Delete, Query 
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

// Все запросы, содержащие в пути /notes, будут перенаправлены в этот контроллер
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post() // обработает POST http://localhost/notes?userId={userId}
  create(
  	@Query('userId') userId: number, // <--- достанет userId из query строки  
   	@Body() createNoteDto: CreateNoteDto
	) {
    return this.notesService.create(userId, createNoteDto);
  }

  @Get() // обработает GET http://localhost/notes?userId={userId}
  findAll(@Query('userId') userId: number) {
    return this.notesService.findAll(userId);
  }

  @Get(':noteId') // обработает GET http://localhost/notes/{noteId}
  findOne(@Param('noteId') noteId: number) {
    return this.notesService.findOne(noteId);
  }

  @Patch(':noteId') // обработает PATCH http://localhost/notes/{noteId}
  update(@Param('noteId') noteId: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(noteId, updateNoteDto);
  }

  @Delete(':noteId') // обработает DELETE http://localhost/notes/{noteId}
  remove(@Param('noteId') noteId: number) {
    return this.notesService.remove(noteId);
  }
}
import { 
  Controller, Get, Post, 
  Body, Patch, Param, Delete, Query, HttpStatus, ParseIntPipe, UseGuards 
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Note } from './entities/note.entity';
import { AuthGuard } from '@nestjs/passport';

// Все запросы, содержащие в пути /notes, будут перенаправлены в этот контроллер
@ApiTags('Notes')
@ApiSecurity("X-API-KEY", ["X-API-KEY"]) // <----- Авторизация через Swagger 
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post() // обработает POST http://localhost/notes?userId={userId}
  @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Creates a new note for the user" })
  @ApiQuery({ name: "userId", required: true, description: "User identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  create(
  	@Query('userId', new ParseIntPipe()) userId: number, // <--- достанет userId из query строки  
   	@Body() createNoteDto: CreateNoteDto
	) {
    return this.notesService.create(userId, createNoteDto);
  }

  @Get() // обработает GET http://localhost/notes?userId={userId}
  @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Returns all available notes for the user" })
  @ApiQuery({ name: "userId", required: true, description: "User identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Note, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  findAll(@Query('userId', new ParseIntPipe()) userId: number) {
    return this.notesService.findAll(userId);
  }

  @Get(':noteId') // обработает GET http://localhost/notes/{noteId}
  @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Returns a note with specified id" })
  @ApiParam({ name: "noteId", required: true, description: "Note identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  findOne(@Param('noteId', new ParseIntPipe()) noteId: number) {
    return this.notesService.findOne(noteId);
  }

  @Patch(':noteId') // обработает PATCH http://localhost/notes/{noteId}
  @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Updates a note with specified id" })
  @ApiParam({ name: "noteId", required: true, description: "Note identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  update(@Param('noteId', new ParseIntPipe()) noteId: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(noteId, updateNoteDto);
  }

  @Delete(':noteId') // обработает DELETE http://localhost/notes/{noteId}
  @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Deletes a note with specified id" })
  @ApiParam({ name: "noteId", required: true, description: "Note identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  remove(@Param('noteId', new ParseIntPipe()) noteId: number) {
    return this.notesService.remove(noteId);
  }
}
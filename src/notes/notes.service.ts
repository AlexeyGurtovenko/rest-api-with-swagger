import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {

  private _notes: Note[] = [];

  create(userId: number, dto: CreateNoteDto) {
    const id = this._getRandomInt();
    const note = new Note(id, userId, dto.title, dto.content);
    this._notes.push(note);
    return note;
  }

  findAll(userId: number) {
    return this._notes.filter(note => note.userId == userId);
  }

  findOne(noteId: number) {
    return this._notes.filter(note => note.id == noteId);
  }

  update(noteId: number, dto: UpdateNoteDto) {
    const index = this._notes.findIndex(note => note.id == noteId)
    
    if (index === -1) {
      return;
    }

    const { id, userId } = this._notes[index];
    this._notes[index] = new Note(id, userId, dto.title, dto.content);
    return this._notes[index];
  }

  remove(noteId: number) {
    this._notes = this._notes.filter(note => note.id != noteId)
  }

  private _getRandomInt() {
    return Math.floor(Math.random() * 100);
  }
}
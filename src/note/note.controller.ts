import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Note, Prisma } from '@prisma/client';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post('/')
  async createNote(@Body() data: Prisma.NoteCreateInput): Promise<Note> {
    return await this.noteService.createNote(data);
  }

  @Put('/:id')
  async updateNote(
    @Param('id') id: string,
    @Body() data: Prisma.NoteUpdateInput,
  ): Promise<Note> {
    return await this.noteService.updateNote({ id: Number(id) }, data);
  }

  @Delete('/:id')
  async deleteNote(@Param('id') id: string): Promise<Note> {
    return await this.noteService.deleteNote({ id: Number(id) });
  }

  @Get('/:id')
  async getOneNote(@Param('id') id: number): Promise<Note> {
    // TODO: we will also pass the authenticated user id here when we set that up
    return await this.noteService.findNote({ id: Number(id) });
  }

  @Get('/')
  async getAllNotes(): Promise<Note[]> {
    // TODO: eventually we will get the authenticated user id here and pass this to find all notes
    return await this.noteService.findAllNotes();
  }
}

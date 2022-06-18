import { Injectable } from '@nestjs/common';
import { Note, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async createNote(data: Prisma.NoteCreateInput): Promise<Note> {
    return await this.prisma.note.create({ data });
  }

  async deleteNote(uniqueInput: Prisma.NoteWhereUniqueInput): Promise<Note> {
    return await this.prisma.note.delete({
      where: uniqueInput,
    });
  }

  async updateNote(
    uniqueInput: Prisma.NoteWhereUniqueInput,
    data: Prisma.NoteUpdateInput,
  ): Promise<Note> {
    return await this.prisma.note.update({
      data,
      where: uniqueInput,
    });
  }

  async findNote(uniqueInput: Prisma.NoteWhereUniqueInput): Promise<Note> {
    return await this.prisma.note.findUnique({ where: uniqueInput });
  }

  async findAllNotes(where: Prisma.NoteWhereInput = {}): Promise<Note[]> {
    return await this.prisma.note.findMany({
      where,
    });
  }
}

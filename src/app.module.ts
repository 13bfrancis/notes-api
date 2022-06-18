import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { NoteModule } from './note/note.module';

@Module({
  imports: [NoteModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

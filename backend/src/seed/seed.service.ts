import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { VarkOpcion, VarkPregunta } from './entities/vark';
import { MbtiOpcion, MbtiPregunta } from './entities/mbti';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(VarkPregunta)
    private readonly varkQuestionRepository: Repository<VarkPregunta>,
    @InjectRepository(VarkOpcion)
    private readonly varkOptionRepository: Repository<VarkOpcion>,
    @InjectRepository(MbtiPregunta)
    private readonly mbtiQuestionRepository: Repository<MbtiPregunta>,
    @InjectRepository(MbtiOpcion)
    private readonly mbtiOptionRepository: Repository<MbtiOpcion>,
  ) {}

  async runSeed() {
    await this.insertVarkQuestions();
    await this.insertMbtiQuestions();
    return { message: 'Seed executed successfully!' };
  }

  private async insertVarkQuestions() {
    const seedQuestions = initialData.varkQuestion;

    for (const question of seedQuestions) {
      const newQuestion = this.varkQuestionRepository.create({
        textoPregunta: question.textoPregunta,
      });
      const savedQuestion = await this.varkQuestionRepository.save(newQuestion);

      const options = question.opciones.map((option) =>
        this.varkOptionRepository.create({
          textoOpcion: option.textoOpcion,
          estilo: option.estilo,
          pregunta: savedQuestion,
        }),
      );
      await this.varkOptionRepository.save(options);
    }
  }

  private async insertMbtiQuestions() {
    const seedQuestions = initialData.mbtiQuestion;

    for (const question of seedQuestions) {
      const newQuestion = this.mbtiQuestionRepository.create({
        textoPregunta: question.textoPregunta,
        dimension: question.dimension,
      });
      const savedQuestion = await this.mbtiQuestionRepository.save(newQuestion);

      const options = question.opciones.map((option) =>
        this.mbtiOptionRepository.create({
          textoOpcion: option.textoOpcion,
          puntaje: option.puntaje,
          categoria: option.categoria,
          pregunta: savedQuestion,
        }),
      );
      await this.mbtiOptionRepository.save(options);
    }
  }
}

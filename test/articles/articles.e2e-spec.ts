import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { ArticlesRepository } from '../../src/articles/repositories/articles.repository';
import { AppModule } from '../../src/app/app.module';
import { mockService } from '../utils/mock-service.util';
import { generateArticles } from '../utils/faker-data.utils';
import { datatype } from 'faker';

describe('Articles Controller (e2e)', () => {
  let app: INestApplication;
  let articlesRepository: ArticlesRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    articlesRepository = await mockService(ArticlesRepository, moduleFixture);
    await articlesRepository.removeAll();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await disconnect();
    await app.close();
  });

  it('/articles (POST)', async () => {
    const articleDtoTest = generateArticles();

    return request(app.getHttpServer())
      .post('/articles')
      .send(articleDtoTest)
      .expect(201)
      .then((response) => {
        expect(response.body).toMatchObject(articleDtoTest);
      });
  });

  it('/articles (GET)', async () => {
    await request(app.getHttpServer())
      .get('/articles')
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toEqual('object');
      });

    const articleDtoTest = generateArticles();

    const TriageFormTest1 = await request(app.getHttpServer())
      .post('/articles')
      .send(articleDtoTest)
      .expect(201);

    return request(app.getHttpServer())
      .get('/articles')
      .expect(200)
      .then((response) => {
        expect(response.body).toContainEqual(TriageFormTest1.body);
      });
  });

  it('/articles/:{id} (GET)', async () => {
    const articleDtoTest = generateArticles();

    const article = await request(app.getHttpServer())
      .post('/articles')
      .send(articleDtoTest)
      .expect(201);

    const {
      body: { id: articleId },
    } = article;

    return request(app.getHttpServer())
      .get(`/articles/${articleId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject(article.body);
      });
  });

  it('/articles/:{id} (PUT)', async () => {
    const articleDtoTest = generateArticles();
    const articleDtoTestUpdate = generateArticles();

    const article = await request(app.getHttpServer())
      .post('/articles')
      .send(articleDtoTest)
      .expect(201);

    const {
      body: { id: articleId },
    } = article;

    return request(app.getHttpServer())
      .put(`/articles/${articleId}`)
      .send(articleDtoTestUpdate)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toEqual(articleId);
        expect(response.body).toMatchObject(articleDtoTestUpdate);
      });
  });

  it('/articles/:{id} (DELETE)', async () => {
    const articleDtoTest = generateArticles();

    const article = await request(app.getHttpServer())
      .post('/articles')
      .send(articleDtoTest)
      .expect(201);

    const {
      body: { id: articleId },
    } = article;

    return request(app.getHttpServer())
      .delete(`/articles/${articleId}`)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual(
          `Artigo (id: ${articleId}) deletado com sucesso!`,
        );
      });
  });

  it('/articles/:{id} (GET) - Errors 404', async () => {
    const id = datatype.uuid();

    return request(app.getHttpServer())
      .get(`/articles/${id}`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toEqual(
          'Artigo não encontrado na base de dados.',
        );
      });
  });

  it('/articles/:{id} (GET) - Errors 400', async () => {
    return request(app.getHttpServer())
      .get(`/articles/id_invalid`)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toEqual('Identificador inválido.');
      });
  });

  it('/articles/:{id} (PUT) - Errors 404', async () => {
    const articleDtoTestError = generateArticles();
    const id = datatype.uuid();

    return request(app.getHttpServer())
      .put(`/articles/${id}`)
      .send(articleDtoTestError)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toEqual(
          'Artigo não encontrado na base de dados.',
        );
      });
  });

  it('/articles/:{id} (PUT) - Errors 400', async () => {
    const articleDtoTestError = generateArticles();

    return request(app.getHttpServer())
      .put(`/articles/id_invalid`)
      .send(articleDtoTestError)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toEqual('Identificador inválido.');
      });
  });

  it('/articles/:{id} (DELETE) - Errors 404', async () => {
    const id = datatype.uuid();

    return request(app.getHttpServer())
      .delete(`/articles/${id}`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toEqual(
          `Erro ao deletar o artigo da base de dados.`,
        );
      });
  });

  it('/articles/:{id} (DELETE) - Errors 400', async () => {
    return request(app.getHttpServer())
      .delete(`/articles/id_invalid`)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toEqual(`Identificador inválido.`);
      });
  });
});

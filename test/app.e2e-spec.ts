import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, MethodNotAllowedException, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // app 전역 생성

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // test app = 실제 운영 app 과 동일한 환경으로 구성
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
    )
    
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcom to my Home');
  });


  describe('/movies', () => {

    it('GET', () => {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:'test',
        year:2021,
        genres:['test']
      })
      .expect(201)
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:'test',
        year:2021,
        genres:['test'],
        other:'things'
      })
      .expect(400)
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404);
    })

  });

  describe('/movies/:id', () => {

    it('GET 200', ()=> {
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200)
    });

    
    it('GET 404', ()=> {
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404)
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({title:'hongtest update'})
      .expect(200);
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    });

  });


  // 매번 app 생성
  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Welcom to my Home');
  // });


  // describe('/movies', () => {

  //   it('GET', () => {
  //     return request(app.getHttpServer())
  //     .get('/movies')
  //     .expect(200)
  //     .expect([]);
  //   });

  //   it('POST', () => {
  //     return request(app.getHttpServer())
  //     .post('/movies')
  //     .send({
  //       title:'test',
  //       year:2021,
  //       genres:['test'],
  //     })
  //     .expect(201)
  //   });

  //   it('DELETE', () => {
  //     return request(app.getHttpServer())
  //     .delete('/movies')
  //     .expect(404);
  //   })

  // });

  // describe('/movies/:id', () => {

  //   it.todo('GET');
  //   it.todo('DELETE');
  //   it.todo('PATCH');
  // });


});

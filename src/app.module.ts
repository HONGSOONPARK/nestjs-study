import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MoviesModule } from './movies/movies.module';

// 데코레이터 
// decorateor
// 클래스 위의 함수 
@Module({
  imports: [MoviesModule],
  controllers: [AppController],  // Url 가져오기, 함수실행 (express 의 라우터 역할)
  providers: [], 
})

// 보통 module 생성 후 import 후 사용

// app controller, providders 사용은?
// 
export class AppModule {}

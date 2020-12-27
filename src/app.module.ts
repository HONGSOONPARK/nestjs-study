import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';

// 데코레이터 
// decorateor
// 클래스 위의 함수 
@Module({
  imports: [],
  controllers: [MoviesController],  // Url 가져오기, 함수실행 (express 의 라우터 역할)
  providers: [], 
})
export class AppModule {}

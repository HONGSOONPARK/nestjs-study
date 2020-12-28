import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies:Movie[] = [];


    getAll(): Movie[] {
        // 실제 쿼리 위치
        return this.movies;
    }

    getOne(id:string): Movie {
        // 실제 쿼리 위치
        return this.movies.find(movie => movie.id === +id);
    }

    deleteOne(id:string): boolean {
        // 실제 쿼리 위치
        this.movies.filter(movie => movie.id !== +id);
        return true;
    }

    create(movieData){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies:Movie[] = [];


    getAll(): Movie[] {
        // 실제 쿼리 위치
        return this.movies;
    }

    getOne(id:number): Movie {
        // 실제 쿼리 위치
        const movie = this.movies.find(movie => movie.id === id); 
        //console.log(typeof id);
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;

    }

    deleteOne(id:number){
        // 실제 쿼리 위치
        // this.movies.filter(movie => movie.id !== +id);
        this.getOne(id)
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData:CreateMovieDto){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    update(id:number, updateData:UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }

}

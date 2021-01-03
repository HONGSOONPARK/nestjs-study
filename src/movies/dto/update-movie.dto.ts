import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

// 설치
// npm i @nestjs/mapped-types

export class UpdateMovieDto extends PartialType(CreateMovieDto){}

// {
//     @IsString()
//     readonly title?: string;

//     @IsNumber()
//     readonly year?: number;
    
//     @IsString({each: true})
//     readonly genres?: string[];
// }


// ? -> 필수사항 아님 -> PartialType lib로 해결
// 
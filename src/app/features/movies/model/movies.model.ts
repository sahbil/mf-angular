import {PageableResponse} from '@shared/model/pageable-response.model';


export interface MoviesModel {
  id?: number;
  title: string;
  description: string;
  image: string;
  author: string;
  rating?: number;
}

export interface MoviePageable extends PageableResponse<MoviesModel> {}

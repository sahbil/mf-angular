import {PageableResponse} from '@shared/model/pageable-response.model';


export interface MoviesModel {
  id?: number;
  title: string;
  description: string;
}

export interface MoviePageable extends PageableResponse<MoviesModel> {}

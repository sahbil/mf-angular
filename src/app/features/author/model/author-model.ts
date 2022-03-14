import {PageableResponse} from '@shared/model/pageable-response.model';


export interface AuthorModel {
  id?: number;
  name: string;
  about: string;
}

export interface AuthorPageable extends PageableResponse<AuthorModel> {}

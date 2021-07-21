import { Expose } from 'class-transformer';
import { BaseDto } from 'src/commons/dtos';

class AuthorDto {
  id: number;
  login: string;
  name: string;
  email: string;
  avatarUrl: string;
}

class CommitDto {
  date: Date;
  count: number;
}

export class CommitHistoryDto extends BaseDto {
  @Expose()
  author: AuthorDto;

  @Expose()
  commits: CommitDto[];
}
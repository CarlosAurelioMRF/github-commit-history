import { IsNotEmpty, IsString } from 'class-validator';

export class OwnerRepoDto {
  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  repo: string
}

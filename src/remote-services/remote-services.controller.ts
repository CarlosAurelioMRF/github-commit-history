import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateFetchCommitCommand } from '../commons/commands';
import { errorHandler } from '../commons/handlers';
import { CommitHistoryDto, OwnerRepoDto } from './dto';

@Controller('remote-services')
export class RemoteServicesController {
  constructor(private readonly commandBus: CommandBus) { }

  @Get('github/:owner/:repo/commits')
  async getGithubCommitsHistory(@Param(ValidationPipe) ownerRepoDto: OwnerRepoDto): Promise<CommitHistoryDto> {
    try {
      const commitHistory = await this.commandBus.execute(
        new CreateFetchCommitCommand(ownerRepoDto)
      );
  
      return CommitHistoryDto.factory(CommitHistoryDto, commitHistory);
    } catch (error) {
      throw errorHandler.handle(error);
    }
  }
}

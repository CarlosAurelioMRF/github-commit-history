import { HttpService } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { format, parseISO } from 'date-fns';
import { countBy, groupBy, mapKeys } from 'lodash';

import { ICommit, ICommitHistory, IGitHubResponse } from '../interfaces';
import { CreateFetchCommitCommand } from './create-fetch-commit.command';

@CommandHandler(CreateFetchCommitCommand)
export class CreateFetchCommitHandler implements ICommandHandler<CreateFetchCommitCommand> {
  constructor(private readonly httpService: HttpService) { }

  /**
   * Execute the create FetchCommit Command
   *
   * @param command
   */
  async execute(command: CreateFetchCommitCommand) {
    const { ownerRepo: { owner, repo } } = command;

    const { data } = await this.httpService.get<IGitHubResponse[]>(`repos/${owner}/${repo}/commits`).toPromise();

    return this.formatResponse(data);
  }

  private formatResponse(data: IGitHubResponse[]): ICommitHistory[] {
    const groupedUsers = groupBy(data, 'author.login');

    const commitsHistory: ICommitHistory[] = [];

    mapKeys(groupedUsers, (commitsUser: IGitHubResponse[], login: string) => {
      const [commitUser] = commitsUser;

      const commitHistory: ICommitHistory = {
        author: {
          id: commitUser.author.id,
          login,
          name: commitUser.commit.author.name,
          email: commitUser.commit.author.email,
          avatarUrl: commitUser.author.avatar_url,
        },
        commits: this.getCountCommitsByDate(commitsUser)
      };

      commitsHistory.push(commitHistory);
    });

    return commitsHistory;
  }

  private getCountCommitsByDate(commitsUser: IGitHubResponse[]): ICommit[] {
    const commitsUserDate = countBy(commitsUser, (commitUser: IGitHubResponse) => format(parseISO(commitUser.commit.author.date), 'yyyy-MM-dd'))

    const commits: ICommit[] = [];

    mapKeys(commitsUserDate, (countCommits: number, date: string) => {
      const commit: ICommit = {
        date: parseISO(date),
        count: countCommits
      }

      commits.push(commit);
    });

    return commits;
  }
}

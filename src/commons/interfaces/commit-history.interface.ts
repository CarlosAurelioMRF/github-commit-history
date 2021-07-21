interface IAuthor {
  id: number;
  login: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface ICommit {
  date: Date;
  count: number;
}

export interface ICommitHistory {
  author: IAuthor;
  commits: ICommit[];
}
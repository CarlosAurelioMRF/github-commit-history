interface IGitHubAuthor {
  id: number
  login: string
  avatar_url: string
}

interface IGitHubAuthorCommit {
  name: string
  email: string
  date: string
}

interface IGitHubCommit {
  url: string;
  message: string
  author: IGitHubAuthorCommit
}

export interface IGitHubResponse {
  url: string;
  commit: IGitHubCommit
  author: IGitHubAuthor
}
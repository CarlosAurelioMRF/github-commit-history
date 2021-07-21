import { IOwnerRepo } from "../interfaces";

export class CreateFetchCommitCommand {
  constructor(public readonly ownerRepo: IOwnerRepo) {}
}

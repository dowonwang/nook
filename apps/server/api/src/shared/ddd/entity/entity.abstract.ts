export abstract class Entity<Id> {
  protected readonly _id: Id;

  protected constructor(id: Id) {
    this._id = id;
  }

  get id(): Id {
    return this._id;
  }
}

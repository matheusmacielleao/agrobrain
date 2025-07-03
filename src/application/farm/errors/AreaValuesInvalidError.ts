export class AreaValuesInvalidError extends Error {
  constructor() {
    super('Total farm area is less than util area plus vegetation area');
  }
}

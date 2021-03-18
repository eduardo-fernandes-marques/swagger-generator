export class Error {
  public details?: any;
  public message?: string;
  public status: number = 500;

  constructor(props: Error) {
    Object.assign(this, props);
  }
}

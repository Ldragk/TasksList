export class Title {

  private readonly title: string;

  public get value(): string {
    return this.title;
  }

  private validadeTitleLength(title: string): boolean {
    return title.length >= 1 && title.length <= 30;
  }

  constructor(title: string) {
    const isTitleLengthValid = this.validadeTitleLength(title);

    if (!isTitleLengthValid) {
      throw new Error("Title must be between 1 and 30 characters");
    }

    this.title = title;
  }
}

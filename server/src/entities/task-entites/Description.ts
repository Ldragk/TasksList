export class Description {

    private readonly description: string;
  
    public get value(): string {
      return this.description;
    }
  
    private validadeDescriptionLength(description: string): boolean {
      return description.length >= 1 && description.length <= 500;
    }
  
    constructor(description: string) {
      const isDescriptionLengthValid = this.validadeDescriptionLength(description);
  
      if (!isDescriptionLengthValid) {
        throw new Error("Description must be between 1 and 500 characters");
      }
  
      this.description = description;
    }
  }
  
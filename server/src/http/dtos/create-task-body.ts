export class CreateTaskBody {
  title!: string;
  description!: string;
  limitDay!: number;
  limitMonth!: number;
  limitYear!: number;
  // date?: string;
  done?: boolean;
  // createdAt?: Date;
  // updatedAt?: Date;
}

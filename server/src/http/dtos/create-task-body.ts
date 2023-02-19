import { IsNotEmpty, IsUUID, Length, ValidateIf } from "class-validator";
import { numberOfDaysInTheMonth } from "../../use-cases/notifications-cases/functions/numberOfDaysInTheMonth";

export class TaskBody {
  @IsNotEmpty()
  @Length(1, 30)
  title!: string;

  @Length(5, 250)
  content!: string;

  @ValidateIf((o) => o.limitDay >= 1 && o.limitDay <= numberOfDaysInTheMonth())
  limitDay!: number;

  @ValidateIf((o) => o.limitMonth >= 1 && o.limitMonth <= 12)
  limitMonth!: number;

  @ValidateIf((o) => o.limitYear >= 2023)
  limitYear!: number;

  done?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  @IsNotEmpty()
  @IsUUID()
  id?: string;
}

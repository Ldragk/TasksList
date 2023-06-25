import { IsNotEmpty, IsObject, IsUUID, Length, ValidateIf } from "class-validator";
import { numberOfDaysInTheMonth } from "@src/use-cases/notifications-cases/functions/numberOfDaysInTheMonth";

export class TaskBody {
  @IsNotEmpty()
  @Length(1, 30)
  title!: string;

  @Length(5, 250)
  content!: string;

  @IsNotEmpty()
  @ValidateIf((o) => new Date(o).getDay() >= 1 && new Date(o).getDay() <= numberOfDaysInTheMonth(o))
  @ValidateIf((o) => String(new Date(o).getDay()).length <= 2)
  @ValidateIf((o) => new Date(o).getMonth() >= 1 && new Date(o).getMonth() <= 12)
  @ValidateIf((o) => String(new Date(o).getMonth()).length <= 2)
  @ValidateIf((o) => new Date(o).getFullYear() >= new Date().getFullYear())
  @ValidateIf((o) => String(new Date(o).getFullYear()).length <= 4)
  date!: string

  done?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  @IsNotEmpty()
  id?: string;

  @IsNotEmpty()
  userId?: string;

}

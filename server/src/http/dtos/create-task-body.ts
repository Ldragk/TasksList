export class TaskBody {  
  title!: string;
  description!: string;
  limitDay!: number;
  limitMonth!: number;
  limitYear!: number; 
  date?: string | undefined | null
  done?: boolean;
  createdAt?: Date;
  updatedAt?: Date;    
  id?: string;
}

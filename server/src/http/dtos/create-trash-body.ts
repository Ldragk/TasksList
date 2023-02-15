export class TrashBody {  
  title!: string;
  description!: string;
  limitDay!: number;
  limitMonth!: number;
  limitYear!: number;   
  done?: boolean;
  createdAt?: Date;
  deletedAt?: Date;    
  id?: string;
}

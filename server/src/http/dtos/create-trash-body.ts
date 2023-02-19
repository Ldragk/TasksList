export class TrashBody {  
  title!: string;
  content!: string;
  limitDay!: number;
  limitMonth!: number;
  limitYear!: number; 
  date?: string | undefined | null
  done?: boolean;
  createdAt?: Date;
  deletedAt?: Date;    
  id?: string;
}

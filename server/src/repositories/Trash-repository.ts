import { Trash } from "../entities/Trash";
import { TrashBody } from "../http/dtos/create-trash-body";

export abstract class TrashRepository {
  abstract create(trash: Trash): Promise<void>;
  abstract findAllTrash(): Promise<Trash[]>; 
}

import { Trash } from "../entities/Trash";

export abstract class TrashRepository {
  abstract create(trash: Trash): Promise<void>;
  abstract findAllTrash(): Promise<Trash[]>; 
}

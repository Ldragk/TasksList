import { ObjectId } from 'bson';
import { Task } from './task';
import { Trash } from './trash';

export interface UserProps {
    email: string;
    password: string;
    name: string;
    createdAt?: Date;
    tasks?: Task[];
    trash?: Trash[];
}
export class User {
    private _id: string;
    private props: UserProps;

    constructor(props: UserProps, id?: string) {

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(props.email)) {
            throw new Error('The email format is invalid!');
        }

        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(new Date().setSeconds(0, 0))
        };
        this._id = id ?? String(new ObjectId());
    }

    public set id(id: string) {
        this.id = id;
    }

    public get id(): string {
        return this._id;
    }

    public set email(email: string) {
        this.props.email = email;
    }


    get email(): string {
        return this.props.email;
    }

    public set password(password: string) {
        this.props.password = password;
    }

    public get password(): string {
        return this.props.password;
    }

    public set name(name: string) {
        name.length >= 1
            ? (this.props.name = name)
            : new Error('Name is required and must be between 1 and 30 characters');
    }

    public get name(): string {
        return this.props.name;
    }

    public set createdAt(createdAt: Date | undefined) {
        this.props.createdAt = createdAt;
    }

    public get createdAt(): Date | undefined {
        return this.props.createdAt;
    }

    public set tasks(tasks: Task[] | undefined) {
        this.props.tasks = tasks;
    }

    public get tasks(): Task[] | undefined {
        return this.props.tasks;
    }

    public set trash(trash: Trash[] | undefined) {
        this.props.trash = trash;
    }

    public get trash(): Trash[] | undefined {
        return this.props.trash;
    }
}

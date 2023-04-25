import {Group} from "./Group";
import {Role} from "./Role";

export class User {
    id: string;
    name: string;
    userName?: string;
    email: string;
    password?: string;
    isInternal?: boolean;
    groups?: Group[];
    roles?: Role[];
    active? : boolean;
    firstName?: string;
    lastName?: string;
    externalId?: string;
    phone?:string;
}

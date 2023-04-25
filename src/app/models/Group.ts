import {User} from "./user";
import {Role} from "./Role";

export interface Group {
    groupName: string;
    description?: string;
    id: string;
    name: string;
    users?: User[];
    roles?: Role[];
}

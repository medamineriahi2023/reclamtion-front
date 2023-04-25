export interface Role {
    id: string;
    name: string;
    permissions?: Role[];
}

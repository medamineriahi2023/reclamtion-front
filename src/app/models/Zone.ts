export interface Zone {
    code: string;
    description?: string;
    id: string;
    name: string;
    parentId?: string;
    resourceIds?: string[],
    childrens?: Zone[]
}

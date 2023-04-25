import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Role} from "../../models/Role";
import {AddEditRoleComponent} from "../modals/add-edit-role/add-edit-role.component";

@Component({
  selector: 'role-container',
  templateUrl: './role-container.component.html',
  styleUrls: ['./role-container.component.scss']
})
export class RoleContainerComponent {
    filterValue = '';

    constructor(private _matDialog: MatDialog) {
    }


    addGroup() {
        this._matDialog.open(AddEditRoleComponent, {});
    }


    filterPredicate: (role: Role, filter: string) => boolean = (role: Role, filter: string): boolean => {
        const keys = ['name'];
        const dataStr = Object.keys(role as unknown as Record<string, any>).filter(key => keys.includes(key))
            .reduce((currentTerm: string, key: string) => {
                return currentTerm + (role as unknown as Record<string, any>)[key] + '◬';
            }, '')
            .toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();

        return dataStr.indexOf(transformedFilter) !== -1;
    };
}

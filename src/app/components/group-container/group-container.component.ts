import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Group} from "../../models/Group";
import {AddEditGroupComponent} from "../modals/add-edit-group/add-edit-group.component";

@Component({
  selector: 'group-container',
  templateUrl: './group-container.component.html',
  styleUrls: ['./group-container.component.scss']
})
export class GroupContainerComponent {
    filterValue = '';

    constructor(private _matDialog: MatDialog) {
    }


    addGroup() {
        this._matDialog.open(AddEditGroupComponent, {});
    }


    filterPredicate: (group: Group, filter: string) => boolean = (group: Group, filter: string): boolean => {
        const keys = ['name', 'kcUsers','roles'];
        let dataStr = Object.keys(group as unknown as Record<string, any>).filter(key => keys.includes(key))
            .reduce((currentTerm: string, key: string) => {
                if (key === 'kcUsers') {
                    return currentTerm + (group as unknown as Record<string, any>)[key].length + '◬';
                }
                if (key === 'roles') {
                    const roleNames = (group as unknown as Record<string, any>)[key].map((role: any) => role.name);
                    return currentTerm + roleNames.join(',') + '◬';
                }
                return currentTerm + (group as unknown as Record<string, any>)[key] + '◬';
            }, '')
            .toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
    };
}

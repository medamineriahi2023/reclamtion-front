import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../models/User";
import {AddUserComponent} from "../modals/add-user/add-user.component";

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent {
    filterValue = '';
    public refresh: boolean;

    constructor(private _matDialog: MatDialog) {
    }

    addUser() {
        let dialog = this._matDialog.open(AddUserComponent);
        dialog.afterClosed().subscribe(res => {
            this.refresh= true;
        })
    }

    filterPredicate: (data: User, filter: string) => boolean = (user: User, filter: string): boolean => {
        const keys = ['firstName','lastName','username', 'status', 'email'];
        const dataStr = Object.keys(user as unknown as Record<string, any>).filter(key => keys.includes(key))
            .reduce((currentTerm: string, key: string) => {
                return currentTerm + (user as unknown as Record<string, any>)[key] + '◬';
            }, '')
            .toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();

        return dataStr.indexOf(transformedFilter) !== -1;
    };
}


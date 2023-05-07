import { Component } from '@angular/core';
import {Operation} from "../../models/Operation";
import {MatDialog} from "@angular/material/dialog";
import {OperationsService} from "../../core/services/operations/operations.service";
import {KeycloakService} from "keycloak-angular";
import {AddPostComponent} from "../modals/add-post/add-post.component";
import {Status} from "../../models/Status";

@Component({
  selector: 'suggestions-container',
  templateUrl: './suggestions-container.component.html',
  styleUrls: ['./suggestions-container.component.scss']
})
export class SuggestionsContainerComponent {
    filterValue = '';
    public operations : Operation[];
    public userId: string;
    constructor(private _matDialog: MatDialog, public operationService : OperationsService, private keycloakService: KeycloakService) {
        keycloakService.loadUserProfile().then(u => {this.userId = u.id ;});
    }


    addPost() {
        const dialogRef = this._matDialog.open(AddPostComponent, {data : {status : Status.SUGGESTION, isNew : true } });
        dialogRef.componentInstance.closeModal.subscribe(() => {
            this.operationService.getAll().subscribe(data => {
                this.operations = data.filter(o => o.status.toString() === "SUGGESTION");
            });
        });
    }


    filterPredicate: (operation: Operation, filter: string) => boolean = (operation: Operation, filter: string): boolean => {
        const keys = ['name', 'kcUsers','roles'];
        let dataStr = Object.keys(operation as unknown as Record<string, any>).filter(key => keys.includes(key))
            .reduce((currentTerm: string, key: string) => {
                if (key === 'kcUsers') {
                    return currentTerm + (operation as unknown as Record<string, any>)[key].length + '◬';
                }
                if (key === 'roles') {
                    const roleNames = (operation as unknown as Record<string, any>)[key].map((role: any) => role.name);
                    return currentTerm + roleNames.join(',') + '◬';
                }
                return currentTerm + (operation as unknown as Record<string, any>)[key] + '◬';
            }, '')
            .toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
    };
}

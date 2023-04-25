import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Group} from "../../models/Group";
import {AddPostComponent} from "../modals/add-post/add-post.component";
import {Status} from "../../models/Status";
import {OperationsService} from "../../core/services/operations/operations.service";
import {Operation} from "../../models/Operation";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'operations-container',
  templateUrl: './reclamations-container.component.html',
  styleUrls: ['./reclamations-container.component.scss']
})
export class ReclamationsContainerComponent {
    filterValue = '';
    public operations : Operation[];
    public userId: string;
    constructor(private _matDialog: MatDialog, public operationService : OperationsService, private keycloakService: KeycloakService) {
        keycloakService.loadUserProfile().then(u => {this.userId = u.id ;});
    }


    addPost() {
        const dialogRef = this._matDialog.open(AddPostComponent, {data : {status : Status.RECLAMATION, isNew : true } });
        dialogRef.componentInstance.closeModal.subscribe(() => {
            this.operationService.getAll().subscribe(data => {
                this.operations = data.filter(o => o.status.toString() === "RECLAMATION");
            });
        });
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

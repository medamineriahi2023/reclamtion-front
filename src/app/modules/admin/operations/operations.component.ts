import {ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent {
    panels: any[] = [];
    selectedPanel = '';
    comp: any;

    constructor(
        // private securityUserSandbox: SecurityUserSandbox,
        //         private groupSandbox: GroupSandbox,
        private cdRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.panels = [
            {
                id: 'Reclamations',
                icon: 'heroicons_outline:user-group',
                title: 'Reclamations',
                description: 'Manage your users'
            },
            {
                id: 'Suggestions',
                icon: 'heroicons_outline:user-group',
                title: 'Suggestions',
                description: 'Manage your groups'
            },
        ];
    }

    // show component
    detectComp(comp: any):void {
        if (comp === 'Users') {
            // this.comp = UserContainerComponent;
        }
        if (comp === 'Groups') {
            // this.comp = GroupContainerComponent;
        }
        if (comp === 'Roles') {
            // this.comp = RoleContainerComponent;
        }
        this.selectedPanel = comp;
    }

}


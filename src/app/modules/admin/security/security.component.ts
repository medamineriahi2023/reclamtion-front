import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent  implements OnInit{
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
                id: 'Users',
                icon: 'heroicons_outline:user-group',
                title: 'Users',
                description: 'Manage your users'
            },
            {
                id: 'Groups',
                icon: 'heroicons_outline:user-group',
                title: 'Groups',
                description: 'Manage your groups'
            },
            {
                id: 'Roles',
                icon: 'heroicons_outline:lock-closed',
                title: 'Roles',
                description: 'Manage your roles'
            }
        ];
    }

    // show component
    detectComp(comp: any):void {
        if (comp === 'Users') {
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

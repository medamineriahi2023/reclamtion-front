import {Component} from '@angular/core';
import {LdapContainerComponent} from "../../../components/ldap-container/ldap-container.component";

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent {
    panels: any[] = [];
    selectedPanel = '';
    comp: any;

    ngOnInit(): void {
        this.panels = [
            {
                id: 'LDAP',
                icon: 'heroicons_outline:user-group',
                title: 'LDAP SERVERS',
                description: 'Manage your LDAP servers'
            },
        ];
    }

    // show component
    detectComp(comp: any):void {
        if (comp === 'LDAP') {
            this.comp = LdapContainerComponent;
        }
        this.selectedPanel = comp;
    }

}

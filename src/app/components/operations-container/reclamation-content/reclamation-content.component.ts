import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OperationsService} from "../../../core/services/operations/operations.service";
import {Operation} from "../../../models/Operation";

@Component({
    selector: 'reclamation-content',
    templateUrl: './reclamation-content.component.html',
    styleUrls: ['./reclamation-content.component.scss']
})
export class ReclamationContentComponent implements OnInit, OnChanges {
    isLoading: boolean;
    operations: Operation[];
    @Input() op: Operation[];
    @Input() userId : string;
    constructor(private operationService: OperationsService) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.op && changes.op.currentValue) {
            this.operations = changes.op.currentValue;
        }

        if (changes.userId && changes.userId.currentValue) {
            this.userId = changes.userId.currentValue;
        }
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.operationService.getAll().subscribe(o =>{ this.operations = o.filter(e => e.status.toString() === "RECLAMATION"); this.isLoading= false});
    }


}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Operation} from "../../../models/Operation";
import {OperationsService} from "../../../core/services/operations/operations.service";

@Component({
  selector: 'suggestions-content',
  templateUrl: './suggestions-content.component.html',
  styleUrls: ['./suggestions-content.component.scss']
})
export class SuggestionsContentComponent implements OnChanges,OnInit{
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
        this.refresh();
    }


    refresh() {
        this.operationService.getAll().subscribe(o =>{ this.operations = o.filter(e => e.status.toString() === "SUGGESTION"); this.isLoading= false});
    }
}

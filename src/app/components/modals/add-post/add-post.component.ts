import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Operation} from "../../../models/Operation";
import {KeycloakService} from "keycloak-angular";
import {OperationsService} from "../../../core/services/operations/operations.service";
import {Image} from "../../../models/Image";
import {React} from "../../../models/React";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit{
    operationForm: FormGroup;
    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
    operations: Operation = {id: undefined, description: '', userId: '', images: [], react: [], comments : [] ,status : null, topic: '', liked:false , disliked:false };
    title?: string;
    operation?:string;
    submitted = false
    display: string = '';
    public files: FileList;
    public userId: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AddPostComponent>,
        private keycloakService : KeycloakService,
        private operationService: OperationsService
    ) {
        if (this.data.isNew == true ){
            if (this.data.status == 0)
            this.title = "Add new Reclamation";
            else
             this.title = "Add new Suggestion";
            this.operation = "Save";
        }else {
            if (this.data.status == 0)
            this.title = "Update Reclamation";
            else
                this.title = "Update Suggestion";

            this.operation = "Update";
        }
        this.operationForm = new FormGroup({
                topic: new FormControl(this.data?.publication?.topic, [Validators.required]),
                description: new FormControl(this.data?.publication?.description, [Validators.required])
            }
        );

        this.keycloakService.loadUserProfile().then(e => this.userId = e.id);
    }

    ngOnInit(): void {
    }


    onSubmit() {
        this.operations.status  = this.data.status;
        this.operations.topic = this.operationForm.get('topic').value;
        this.operations.description = this.operationForm.get('description').value;
        this.operations.userId = this.userId;
        for (let i =0 ; i< this.files?.length ; i++){
        let image : Image = {id : undefined,url : this.files.item(i).name}
        this.operations.images.push(image);
        }
        if (this.data.isNew){
        this.operationService.save(this.operations).subscribe(s =>  {this.closeModal.emit(); this.close()});
        }else {
            this.operations.id = this.data.publication.id;
            this.operationService.update(this.operations).subscribe(s =>  this.dialogRef.close(s));

        }


    }

    close() {
        this.dialogRef.close();
    }


    handleFileInputChange(files: FileList) {
        this.files = files;
        for (let i = 0; i < files.length; i++) {
            this.display += files.item(i).name;
            if (i !== files.length - 1) {
                this.display += ',';
            }
        }
    }


}

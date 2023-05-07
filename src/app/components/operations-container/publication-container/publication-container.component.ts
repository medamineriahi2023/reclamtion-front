import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Operation} from "../../../models/Operation";
import {animate, style, transition, trigger} from "@angular/animations";
import {OperationsService} from "../../../core/services/operations/operations.service";
import {Comment} from "../../../models/Comment";
import * as moment from 'moment';
import Swal, {SweetAlertOptions} from "sweetalert2";
import {AddPostComponent} from "../../modals/add-post/add-post.component";
import {Status} from "../../../models/Status";
import {MatDialog} from "@angular/material/dialog";

export const fadeInUpAnimation = trigger('fadeInUpAnimation', [
    transition(':enter', [
        style({opacity: 0}),
        animate('500ms ease-out', style({opacity: 1}))
    ])
]);



@Component({
    selector: 'publication-container',
    templateUrl: './publication-container.component.html',
    styleUrls: ['./publication-container.component.scss'],
    animations: [fadeInUpAnimation]
})
export class PublicationContainerComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() publication: Operation;
    @Input() userId: string;
    numberOfLikes: number = 0;
    numberOfDislikes: number = 0;
    public comments: Comment = {id: undefined, userId: '', content: '', images: [], creationDate: null, userName: null};
    commentValue: string;
    photos: string[];

    @Output() deleted = new EventEmitter<boolean>();

    private defaultToastParams: SweetAlertOptions = {
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000
    };
    public randomIndex: number;
    public randomPhoto: string;
    public getSuccessToastParams(): SweetAlertOptions {
        const params = { ...this.defaultToastParams };
        params.customClass = {
            popup: 'bg-green-900',
            title: 'text-white'
        };
        return params;
    }

    constructor(private operationService: OperationsService,
                private _matDialog: MatDialog) {
        this.photos = ['brian-hughes.jpg', 'female-01.jpg', 'female-02.jpg', "female-03.jpg","female-04.jpg"];
    }

    ngAfterViewInit(): void {
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.userId && changes.userId.currentValue) {
            this.userId = changes.userId.currentValue;
        }
    }
    ngOnInit(): void {
        this.refreshLikes();
        this.randomIndex = Math.floor(Math.random() * this.photos.length);
        this.randomPhoto = this.photos[this.randomIndex];

    }

    formatDate(date: Date): string {
        return moment(date).fromNow();
    }
    refreshLikes(){
        this.numberOfLikes = this.publication.react.filter(e => e.reaction === true).length;
        this.numberOfDislikes = this.publication.react.filter(e => e.reaction === false).length;
        if (this.publication.react.length == 0){
            this.publication.liked = null;
        }else {
            this.publication.liked =  this.publication.react.filter(e => e.reaction === true).map(u => u.userId).includes(this.userId);
            this.publication.disliked =  this.publication.react.filter(e => e.reaction === false).map(u => u.userId).includes(this.userId);
        }
    }

    likeAnOperation(operationId: any ){
        this.operationService.likeAnOperation(operationId, this.userId).subscribe(o=>{ this.publication = o ; this.refreshLikes()});
    }

    dislikeAnOperation(operationId: any ){
        this.operationService.dislikeAnOperation(operationId, this.userId).subscribe(o=>{ this.publication = o ; this.refreshLikes()});

    }

    comment(operationId: any ){
                this.comments.userId = this.userId;
                this.comments.content = this.commentValue;
        this.operationService.comment(this.comments, operationId).subscribe(o=>{ this.publication = o ; this.refreshLikes(); this.commentValue = ""});
    }


    edit(publication: Operation) {
        const dialogRef = this._matDialog.open(AddPostComponent, {data : {status : Status.RECLAMATION, isNew : false , publication : publication}});
        dialogRef.afterClosed().subscribe(result => {
            if (result){
            Swal.mixin(this.getSuccessToastParams()).fire({
                position: 'top-end',
                icon: 'success',
                title: "Operation updated successfully",
                showConfirmButton: false,
                timer: 3000
            })

            this.publication = result;
            }
        });    }

    delete(id: number) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 m-5',
                cancelButton: 'px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-600'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Delete',
            reverseButtons: false
        }).then((result) => {
            if (result.isConfirmed) {
                this.operationService.delete(id).subscribe(s => this.deleted.emit(true));
                 Swal.mixin(this.getSuccessToastParams()).fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Operation deleted successfully",
                    showConfirmButton: false,
                    timer: 3000
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        })
    }
    random(): string{
        let randomIndex = Math.floor(Math.random() * this.photos.length);
        return this.photos[randomIndex];
    }

    shareFacebook() {

    }

    shareTwitter() {

    }

    shareLinkedIn() {

    }
}

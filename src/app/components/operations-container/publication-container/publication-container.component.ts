import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Operation} from "../../../models/Operation";
import {animate, style, transition, trigger} from "@angular/animations";
import {OperationsService} from "../../../core/services/operations/operations.service";
import {Comment} from "../../../models/Comment";
import * as moment from 'moment';
import {UserService} from "../../../core/services/user/user.service";

export const fadeInUpAnimation = trigger('fadeInUpAnimation', [
    transition(':enter', [
        style({opacity: 0}),
        animate('1000ms ease-out', style({opacity: 1}))
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
    public comments: Comment = {id: undefined, userId: '', content: '', images: [], creationDate: null, username: ''};
    commentValue: string;
    public username: string;

    @Output() isLoadingChange = new EventEmitter<boolean>();


    constructor(private operationService: OperationsService,
                private userService: UserService) {

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
        this.getUserById();

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
        this.operationService.likeAnOperation(operationId, this.userId).subscribe(o=>{ this.publication = o ; this.refreshLikes();this.getUserById();});
Comment
    }

    dislikeAnOperation(operationId: any ){
        this.operationService.dislikeAnOperation(operationId, this.userId).subscribe(o=>{ this.publication = o ; this.refreshLikes();this.getUserById();});

    }

    comment(operationId: any ){
                this.comments.userId = this.userId;
                this.comments.content = this.commentValue;
        this.operationService.comment(this.comments, operationId).subscribe(o=>{ this.publication = o ; this.refreshLikes();this.getUserById(); this.commentValue = ""});
    }


    getUserById(){
        this.publication.comments.forEach(c =>this.userService.getUserName(c.userId).subscribe(e => {c.username = e["username"] ;}) )

    }
}

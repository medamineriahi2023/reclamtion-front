import {Image} from "./Image";

export interface Comment {
     id : number;
     userId : string;
     images : Image[];

     content: string;

    userName: string;


     creationDate : Date;
}

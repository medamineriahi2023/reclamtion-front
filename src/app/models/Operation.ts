import {Status} from "./Status";
import {React} from "./React";
import {Image} from "./Image";
import {Comment} from "./Comment";

export interface Operation {

    id :number;

    description: string;

    status: Status;

     topic: string;

     userId: string;


     react: React[];


     images: Image[];

     comments: Comment[];

     liked : boolean;

     disliked : boolean;
}

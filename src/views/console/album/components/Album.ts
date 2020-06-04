export class Album {
    _id?: string;
    name?: string;
    type?: string = 'FOLDER';
    publish?: number = 1;
    children?: Array<any>;
    childCount?: number;
    imgUrl?: string;
    description?: string;
}
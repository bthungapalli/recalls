export class Category {
    public _id?:number;
    public categoryName?: string;
    public subCategories?:string[]=[];
    public rows?:Object[]=[];
    public values?: Object[]=[];
    public created_at?: Date;
    public updated_at?: Date;
}

import {Vehicle} from './vehicle.model';

export class Recall {
    public _id?:number;
    public title?: string;
    public categoryName?:string;
    public subCategories?:string[]=[];
//Consumer Products
    public productName?: string;
    public hazard?: string;
    public remedy?: string;
    public recallDate?: Object;
    public recallNumber?: string;
    public description?: string;
    public incidentsOrInjuries?:String;
    public soldAt?: string;
    public importer?: string;
    public manufacturer?: string;
    public manufacturedIn?: string;
    public units?: string;
    
    // food
    public immediateRelease?:Object;
    public consumers?:string;
    public media?:string;
    
    //Meat and Poultry Products
    public classRecall?:string;
    public healthRisk?:string;
    
    public nHTSACampaignNumber?:string;
    public components?:string;
    public summary?:string;
    public notes?:string;
    public vehicles?:Vehicle[]=[];
    public files?:string[]=[];
    
    public number?:string;
    public company?:string;
    public model?:string;
    public hIN?:string;
    public disposition?:string;
    public boatType?:string;
    public severity?:string;
    public comments?:string;
    public mIC?:string;
    public companyOfficial?:string;
    public modelYear?:string;
    public caseOpenDate?:Object;
    public caseCloseDate?:Object;
    public campaignOpenDate?:Object;
    public campaignCloseDate?:Object;
    
    public created_at?: Date;
    public updated_at?: Date;
}

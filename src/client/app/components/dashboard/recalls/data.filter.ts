import {Pipe, PipeTransform} from "@angular/core";
import {Recall} from "./recalls.model";


@Pipe({
    name: "dataFilter"
})
export class DataFilterPipe implements PipeTransform {

    transform(array: Recall[], query: string): any {
    var temp:Recall[]=[];
        if (query) {
        array.forEach(function (recall) {
              if(recall.title.toUpperCase().indexOf(query.toUpperCase()) > -1){
              temp.push(recall);
              }
        });
        }else{
        temp=array;
        }
        return temp;
    }
}

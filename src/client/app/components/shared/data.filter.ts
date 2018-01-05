import {Pipe, PipeTransform} from "@angular/core";


function titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).replace(/([A-Z])/g, ' $1').trim();
  }
  
  @Pipe({name: 'titlecase'})
  export class TitleCasePipe implements PipeTransform {
    transform(value: string): string {
      if (!value) return value;
      return value.split(/\b/g).map(word => titleCaseWord(word)).join('');
    }
  }

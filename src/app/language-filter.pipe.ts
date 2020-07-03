import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageFilter',
  pure: false
})
export class LanguageFilterPipe implements PipeTransform {

  transform(items: any[], language: string): any {
    if (!items || !language) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(function(item) {
      return item.language === language;
    });
  }

}

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'languageFilter',
  pure: false
})
export class LanguageFilterPipe implements PipeTransform {

  transform(list: any, lang: string): any[] {
    try {
      return list.filter((listing: any) => listing.lang === lang);
    }catch (e) {
    }
  }
}

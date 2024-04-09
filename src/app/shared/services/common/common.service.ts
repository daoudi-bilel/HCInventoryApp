import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {}

  sideBarExpandedSubject: Subject<boolean> = new Subject();
  sideBarExpanded = true;

  onExpandSideBar() {
    this.sideBarExpanded = !this.sideBarExpanded;
    this.sideBarExpandedSubject.next(this.sideBarExpanded);
  }

  toSnakeCase(object: any) {
    const snakeData: any = {};
    for (let key in object) {
      const keySnake = this.camelToSnakeCase(key);
      snakeData[keySnake] = object[key];
    }
    return snakeData;
  }

  toCamelCase(object: any) {
    if (Array.isArray(object)) {
      const camelArray = [];
      for (let snakeObj of object) {
        const camelData: any = {};
        for (let key in snakeObj) {
          const keyCamel = this.snakeToCamel(key);
          camelData[keyCamel] = snakeObj[key];
        }
        camelArray.push(camelData);
      }
      return camelArray;
    } else {
      const camelData: any = {};
      for (let key in object) {
        const keyCamel = this.snakeToCamel(key);
        camelData[keyCamel] = object[key];
      }
      return camelData;
    }
  }

  snakeToCamel = (str: string) =>
    str
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
      );

  camelToSnakeCase = (str: string) =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

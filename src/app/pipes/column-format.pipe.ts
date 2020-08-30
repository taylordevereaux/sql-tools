import { Pipe, PipeTransform } from '@angular/core';
import { DataType } from '../tools/tool-excel-to-insert/tool-excel-to-insert.state';
import * as moment from 'moment';

@Pipe({
  name: 'columnFormat'
})
export class ColumnFormatPipe implements PipeTransform {

  transform(value: any, dataType: DataType): any {
    if (dataType === DataType.date) {
      return moment(value).format('yyyy/MM/dd');
    }
    else if (dataType === DataType.decimal) {
      return parseFloat(value);
    }
    else if (dataType === DataType.number) {
      return parseInt(value, 10);
    }
    else if (dataType === DataType.string) {
      return `'${value}'`;
    }
    return value;
  }

}

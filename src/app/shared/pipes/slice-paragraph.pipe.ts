import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceParagraph',
  standalone: true,
})
export class SliceParagraphPipe implements PipeTransform {
  transform(values: string, end = 100): string {
    return values.length > end ? `${values.slice(0, end)}...` : values;
  }
}

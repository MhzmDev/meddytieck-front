import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  model,
  output,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { TablePageEvent } from 'primeng/table';
import { mtkTemplateDirective } from '../../directives/mtk-template.directive';
import { Context } from '../../interfaces/context';
import { getNestedDotValue } from '../../utils/get-nested-dot-value';
import { TableColumns } from './models/table.model';

@Component({
  selector: 'mtk-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line
  standalone: false,
})
export class TableComponent<T extends object> {
  readonly first = model(0);

  readonly columns = input.required<TableColumns<T>>();
  readonly value = input.required<T[]>();
  readonly totalRecords = input.required<number>();

  readonly type = input<'table' | 'card'>('table');
  readonly paginator = input(false, { transform: booleanAttribute });
  readonly rows = input(10);
  readonly selectable = input(false, { transform: booleanAttribute });
  readonly menuItems = input<MenuItem[]>();
  readonly showMenuItems = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  readonly pageChange = output<TablePageEvent>();
  readonly rowSelect = output<T>();
  protected readonly lazy = computed(() => this.paginator());

  private readonly templatesRef = contentChildren(mtkTemplateDirective);

  get contextType() {
    return {} as Context<T>;
  }

  protected get bodyContextType() {
    return {} as Context<T, { columns: TableColumns<T> }>;
  }

  protected get headerContextType() {
    return {} as Context<TableColumns<T>>;
  }

  onPageChange(event: TablePageEvent | PaginatorState) {
    this.pageChange.emit({
      first: event.first ?? 0,
      rows: event.rows ?? 5,
    });
  }

  protected getValue(item: T, column: TableColumns<T>[0]) {
    if ('computedValue' in column) {
      return column.computedValue?.(item);
    }
    if (!('field' in column)) throw new Error('Field is required');
    return getNestedDotValue(item, column.field as string);
  }

  protected getTemplateByName(name: string) {
    const template = this.templatesRef()?.find(
      (t) => t.getType() === name,
    )?.template;
    if (!template) {
      throw new Error(`Template ${name} not found`);
    }
    return template;
  }

  protected hasTemplate(column: TableColumns<T>[0]) {
    return 'templateName' in column;
  }

  onRowSelect(data: T) {
    this.rowSelect.emit(data);
  }

  getMenuItems(item: T) {
    if (!this.menuItems()) return [];
    return this.menuItems()?.map((menuItem) => ({
      ...menuItem,
      rowData: item,
    }));
  }
}

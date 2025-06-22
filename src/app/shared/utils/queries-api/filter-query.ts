type OpWithB = 'eq' | 'lk' | 'ne' | 'gt' | 'lt' | 'le' | 'ge'; // Operators requiring a third parameter
type OpWithoutB = 'nl' | 'nn'; // Operators not requiring a third parameter
type Op = OpWithB | OpWithoutB;

class FilterQuery {
  private expression: string;
  private _count = 0;
  get count() {
    return this._count;
  }

  // Constructor Overloads
  constructor();
  constructor(filter: FilterQuery);
  constructor(a: string, op: OpWithoutB);
  constructor(a: string, op: OpWithB, b: string | number | boolean);
  constructor(
    aOrFilter?: string | FilterQuery,
    op?: Op,
    b?: string | number | boolean,
  ) {
    if (aOrFilter instanceof FilterQuery) {
      // Initialize with another FilterQuery
      this.expression = aOrFilter.toString();
      this._count += 1;
    } else if (aOrFilter && op && isOpWithoutB(op)) {
      // Operators that don't require a third parameter
      this.expression = `(${aOrFilter},${op})`;
      this._count += 1;
    } else if (aOrFilter && op && b !== undefined) {
      // Operators that require a third parameter
      this.expression = `(${aOrFilter},${op},${b})`;
      this._count += 1;
    } else if (!aOrFilter) {
      // Empty constructor
      this.expression = '';
    } else {
      throw new Error('Invalid arguments for FilterQuery constructor');
    }
  }

  // AND method Overloads
  and(a: string, op: OpWithB, b: string | number | boolean): FilterQuery;
  and(a: string, op: OpWithoutB): FilterQuery;
  and(subFilter: FilterQuery): FilterQuery;
  and(
    aOrSubFilter: FilterQuery | string,
    op?: Op,
    b?: string | number | boolean,
  ): FilterQuery {
    if (aOrSubFilter instanceof FilterQuery) {
      if (!aOrSubFilter.toString()) return this;
      this.expression += `${this.expression ? 'AND' : ''}${aOrSubFilter.count > 1 ? '(' : ''}${aOrSubFilter.toString()}${aOrSubFilter.count > 1 ? ')' : ''}`;
      this._count += 1;
      return this;
    }
    if (op && isOpWithoutB(op)) {
      this.expression += `${this.expression ? 'AND' : ''}(${aOrSubFilter},${op})`;
      this._count += 1;
      return this;
    }
    if (op && b !== undefined) {
      this.expression += `${this.expression ? 'AND' : ''}(${aOrSubFilter},${op},${b})`;
      this._count += 1;
      return this;
    }
    throw new Error('Invalid arguments for AND operation');
  }

  // OR method Overloads
  or(a: string, op: OpWithB, b: string | number | boolean): FilterQuery;
  or(a: string, op: OpWithoutB): FilterQuery;
  or(subFilter: FilterQuery): FilterQuery;
  or(
    aOrSubFilter: FilterQuery | string,
    op?: Op,
    b?: string | number | boolean,
  ): FilterQuery {
    if (aOrSubFilter instanceof FilterQuery) {
      if (!aOrSubFilter.toString()) return this;
      this.expression += `${this.expression ? 'OR' : ''}${aOrSubFilter.count > 1 ? '(' : ''}${aOrSubFilter.toString()}${aOrSubFilter.count > 1 ? ')' : ''}`;
      this._count += 1;
      return this;
    }
    if (op && isOpWithoutB(op)) {
      this.expression += `${this.expression ? 'OR' : ''}(${aOrSubFilter},${op})`;
      this._count += 1;
      return this;
    }
    if (op && b !== undefined) {
      this.expression += `${this.expression ? 'OR' : ''}(${aOrSubFilter},${op},${b})`;
      this._count += 1;
      return this;
    }
    throw new Error('Invalid arguments for OR operation');
  }

  // Convert the filter object to string
  toString(): string {
    return this.expression;
  }
}

// Function Overloads
export function filterQuery(): FilterQuery;
export function filterQuery(
  a: string,
  op: OpWithB,
  b: string | number | boolean,
): FilterQuery;
export function filterQuery(a: string, op: OpWithoutB): FilterQuery;
export function filterQuery(
  a?: string,
  op?: Op,
  b?: string | number | boolean,
): FilterQuery {
  if (a === undefined || op === undefined) return new FilterQuery();
  if (isOpWithoutB(op)) {
    return new FilterQuery(a, op);
  }
  if (b === undefined) throw Error('Invalid arguments for operator');
  return new FilterQuery(a, op, b);
}

// Helper function to check if the operator is OpWithoutB
function isOpWithoutB(op: Op): op is OpWithoutB {
  return op === 'nl' || op === 'nn';
}

export type FilterQueryType = FilterQuery;

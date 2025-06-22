class SortQuery {
  private expression = '';

  asc(a: string): SortQuery {
    this.expression = this.expression
      ? `${this.expression};${a},asc`
      : `${a},asc`;
    return this;
  }

  desc(a: string): SortQuery {
    this.expression = this.expression
      ? `${this.expression};${a},desc`
      : `${a},desc`;
    return this;
  }

  toString(): string {
    return this.expression;
  }
}

export function sortQuery() {
  return new SortQuery();
}

export class QueryStringBuilder {
  private _query: any;
  private set query(value: any) {
      if (this._query == null || this._query === undefined) {
          this._query = '?' + value;
      } else {
          this._query += '&' + value;
      }
  }
  orderBy(queryStringOrderbyBuilder: (queryStringOrderbyBuilder: QueryStringOrderByBuilder) => void) {
      const builder = new QueryStringOrderByBuilder();
      queryStringOrderbyBuilder(builder);
      const query = builder.build();
      this.query = `$orderby=${query}`;
  }
  paging(skip: number, top: number) {
      this.skip(skip);
      this.top(top);
      return this;
  }
  count() {
      this.query = '$count';
      return this;
  }
  skip(prop) {
      this.query = `$skip=${prop}`;
      return this;
  }
  top(prop) {
      this.query = `$top=${prop}`;
      return this;
  }
  select(queryStringSelectBuilder: (queryStringSelectBuilder: QueryStringSelectBuilder) => void) {
      const builder = new QueryStringSelectBuilder();
      queryStringSelectBuilder(builder);
      const query = builder.build();
      if (query !== undefined) {
          this.query = '$select=' + query;
      }
      return this;
  }
  expand(queryStringSelectBuilder: (queryStringSelectBuilder: QueryStringSelectBuilder) => void) {
    const builder = new QueryStringSelectBuilder();
    queryStringSelectBuilder(builder);
    const query = builder.build();
    if (query !== undefined) {
        this.query = '$expand=' + query;
    }
    return this;
}
  filter(queryStringFilterBuilder: (queryStringFilterBuilder: QueryStringFilterBuilder) => void) {
      const builder = new QueryStringFilterBuilder();
      queryStringFilterBuilder(builder);
      const query = builder.build();
      this.query = '$filter=' + query;
      return this;
  }
  build() {
      return this._query;
  }
}
class QueryStringOrderByBuilder {
  private _query: any;
  private set query(value: any) {
      if (this._query == null || this._query === undefined) {
          this._query = value;
      } else {
          this._query += ',' + value;
      }
  }
  none(prop) {
      this.query = prop;
      return this;
  }
  ascending(prop) {
      this.query = `${prop} asc`;
      return this;
  }
  descending(prop) {
      this.query = `${prop} desc`;
      return this;
  }
  build() {
      return this._query;
  }
}
class QueryStringSelectBuilder {
  private _query: any;
  private set query(value: any) {
      if (this._query == null || this._query === undefined) {
          this._query = value;
      } else {
          this._query += ',' + value;
      }
  }
  property(prop) {
      this.query = prop;
      return this;
  }
  build() {
      return this._query;
  }
}
export class QueryStringFilterPropertyBuilder {
  private _query: any;
  private set query(value: any) {
      if (this._query == null || this._query === undefined) {
          this._query = value;
      } else {
          this._query += value;
      }
  }
  constructor(private property: any) {

  }
  contains(value: any) {
      this.query = `contains(${this.property}, '${value}')`;
      return this;
  }
  startsWith(value: any) {
      this.query = `startswith(${this.property},'${value}')`;
      return this;
  }
  endsWith(value: any) {
      this.query = `endswith(${this.property},'${value}')`;
      return this;
  }
  toLower(value: any) {
      this.query = `tolower(${this.property})`;
      return this;
  }
  toUpper(value: any) {
      this.query = `toupper(${this.property})`;
      return this;
  }

  equals(value: any) {
      this.buildCondition('eq', value);
      return this;
  }
  greaterThan(value: any) {
      this.buildCondition('gt', value);
      return this;
  }
  greaterThanOrEqualTo(value: any) {
      this.buildCondition('ge', value);
      return this;
  }
  lessThan(value: any) {
      this.buildCondition('lt', value);
      return this;
  }
  lessThanOrEqualTo(value: any) {
      this.buildCondition('le', value);
      return this;
  }
  notEquals(value: any) {
      this.buildCondition('ne', value);
      return this;
  }
  not() {
      this.query = ' not ';
      return this;
  }
  and() {
      this.query = ' and ';
      return this;
  }
  or() {
      this.query = ' or ';
      return this;
  }
  groupStart() {
      this.query = '(';
      return this;
  }
  groupEnd() {
      this.query = ')';
      return this;
  }
  avarage() {
      this.query = `${this.property}/avarage()`;
      return this;
  }
  max() {
      this.query = `${this.property}/max()`;
      return this;
  }
  min() {
      this.query = `${this.property}/min()`;
      return this;
  }
  count() {
      this.query = `${this.property}/count()`;
      return this;
  }
  all(expressionBuilder: (expressionBuilder: QueryStringFilterBuilder) => void) {
      const builder = new QueryStringFilterBuilder('p/');
      expressionBuilder(builder);
      const expression = builder.build();
      this.query = `${this.property}/all(p: ${expression})`;
      return this;

  }
  any(expressionBuilder: (expressionBuilder: QueryStringFilterBuilder) => void) {
      const builder = new QueryStringFilterBuilder('p/');
      expressionBuilder(builder);
      const expression = builder.build();
      this.query = `any(p: ${expression})`;
      return this;

  }
  private buildCondition(condition: any, value: any) {
      if (
          this.query == null ||
          this.query.trim().endsWith('not') ||
          this.query.trim().endsWith('and') ||
          this.query.trim().endsWith('or')
      ) {
          this.query = this.property;
      }
      if (typeof value === 'string') {
          // check if string contains numbers only
          if (value.match(/^[0-9]+$/) != null) {
              this.query = ` ${condition} ${value}`;
          } else {
              this.query = ` ${condition} '${value}'`;
          }

      } else {
          this.query = ` ${condition} ${value}`;
      }

  }
  build() {
      return this._query;
  }
}
export class QueryStringFilterBuilder {
  private _query: any;
  private set query(value: any) {
      if (this._query == null || this._query === undefined) {
          this._query = value;
      } else {
          this._query += value;
      }
  }
  constructor(private prefix = '') {

  }
  property(name: any, callback: (expressionBuilder: QueryStringFilterPropertyBuilder) => void) {
      const builder = new QueryStringFilterPropertyBuilder(name);
      callback(builder);
      this.query = builder.build();
      return this;
  }

  not() {
      this.query = ' not ';
      return this;
  }
  and() {
      this.query = ' and ';
      return this;
  }
  or() {
      this.query = ' or ';
      return this;
  }
  groupStart() {
      this.query = '(';
      return this;
  }
  groupEnd() {
      this.query = ')';
      return this;
  }
  build() {
      return this._query;
  }
}

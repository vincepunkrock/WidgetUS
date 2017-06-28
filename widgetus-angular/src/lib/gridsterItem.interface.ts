export interface GridsterItem {
  name: string;
  x?: number;
  y?: number;
  rows?: number;
  cols?: number;
  initCallback?: Function;
  dragEnabled?: boolean;
  resizeEnabled?: boolean;
  maxItemRows?: number;
  minItemRows?: number;
  maxItemCols?: number;
  minItemCols?: number;
  [propName: string]: any;
}

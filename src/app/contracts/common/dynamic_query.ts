export class Dynamic{
  sort?:Sort[];
  filter?:Filter;
}

export class Sort{
  field:string;
  dir:string;
}

export class Filter{
  field:string;
  operator:string;
  value:string;
  logic:string;
  filters:Filter[];
}

import { Table } from "primeng/table";

export const dtSettings: Partial<Table> = {
  dataKey: 'id',
  rowHover: true,
  paginator: true,
  rows: 10,
  rowsPerPageOptions: [5,10,25,50,100],
  globalFilterFields: ['id','name'],
  showCurrentPageReport: true,
  resizableColumns: true,
};

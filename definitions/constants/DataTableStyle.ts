import type { DataTableProps } from 'primevue/datatable'

export const DefaultDatatableStyle: DataTableProps = {
  selectionMode: 'single',
  scrollable: true,
  paginator: true,
  lazy: true,
  rowsPerPageOptions: [10, 25, 50],
  paginatorTemplate: 'RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
  stripedRows: true,
}

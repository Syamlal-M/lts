import { DataGrid as MuiDataGrid, DataGridProps as MuiDataGridProps } from "@mui/x-data-grid";

type DataGridProps = MuiDataGridProps;

const DataGrid = (props: DataGridProps) => {
  const { ...rest } = props;

  return <MuiDataGrid {...rest} />;
};

export { DataGrid };

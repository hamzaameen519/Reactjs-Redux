import DataTable from "react-data-table-component";
import React from "react";
import { customStyles } from "../styles/customStyles";

const Table = ({ selectableRows = false, ...props }) => {
  return (
    <DataTable
      onSelectedRowsChange={props.onSelectedRowsChange}
      selectableRows={selectableRows}
      columns={props.columns}
      data={props.data}
      pagination={true}
      paginationServer={true}
      paginationComponentOptions={{
        noRowsPerPage: true,
      }}
      customStyles={customStyles}
      paginationTotalRows={props.paginationTotalRows}
      onChangePage={props.onChangePage}
      noHeader={true}
      paginationDefaultPage={
        props.paginationDefaultPage === 0 ? 1 : props.paginationDefaultPage
      }
    />
  );
};
export default Table;

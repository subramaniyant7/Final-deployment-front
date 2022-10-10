import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import "./DataTableDemo.css";

function Pmo({ columns, data, colEdit, handleTableData }) {
  const [date3, setDate3] = useState(null);

  const cellEditor = (options) => {
    return (
      <Calendar
        id="icon"
        value={date3 !== '' ? date3 : options.value}
        onChange={(e) => {
          let date = new Date(e.value);
          let dd = date.getDate();
          let mm = date.getMonth() + 1;
          let yyyy = date.getFullYear();
          setDate3(dd + "/" + mm + "/" + yyyy)
        }}
        showIcon
        name="popl_2"
      />
    );
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, newRowData, originalEvent: event } = e;
    let data = {...newRowData,[field]: date3 };
    handleTableData(data);
  };

  const milestoneTemplate = () => {
    return "Date";
  };



  return (
    <div>
      <div className="card">
        <DataTable
          value={data}
          className="datatable-editing-demo"
          style={{ border: "1px solid grey" }}
          responsiveLayout="scroll"
          scrollable
          scrollHeight="400px"
        >
          <Column field="milestone" header="Milestone" body={milestoneTemplate}>
            Date
          </Column>
          {columns.map(({ field, header }) => {
            return (
              <Column
                key={field}
                field={field}
                header={header}
                style={{ width: "30%" }}
                {...(colEdit
                  ? { editor: (options) => cellEditor(options) }
                  : {})}
                {...(colEdit ? { onCellEditComplete: onCellEditComplete } : {})}
              />
            );
          })}
        </DataTable>
      </div>
    </div>
  );
}

export default Pmo;
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import "./DataTableDemo.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Pmo({ columns, data, colEdit, handleTableData }) {
  const [date3, setDate3] = useState(null);
  const [newDate, setNewDate] = useState(null)

  const dateFormat = (dateval) => {
    let date = new Date(dateval);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    return mm + "/" + dd + "/" + yyyy;
  }

  const dateFor = (datev) => {
    const d = datev.split('/');
    return d[1] + '/' + d[0] + '/' + d[2]
  }

  const cellEditor = (options) => {
    console.log('options', options)
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
          setNewDate(e.value)
        }}
        showIcon
        name="popl_2"
      />
    );
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, newRowData, originalEvent: event } = e;
    let data = { ...newRowData, [field]: date3 };
    if (field !== 'popl_2') {
      let fieldValue = '';
      switch (field) {
        case 'popl_3':
          fieldValue = newRowData['popl_2']
          break;
        case 'po':
          fieldValue = newRowData['popl_3'] !== 'None' ? newRowData['popl_3'] : newRowData['popl_2']
          break;
        case 'es':
          fieldValue = newRowData['po'] !== 'None' ? newRowData['po'] : newRowData['popl_2']
          break;
        case 'ao':
          fieldValue = newRowData['es'] !== 'None' ? newRowData['es'] : newRowData['popl_2']
          break;
        case 'bo':
          fieldValue = newRowData['ao'] !== 'None' ? newRowData['ao'] : newRowData['popl_2']
          break;
        case 'alpha':
          fieldValue = newRowData['bo'] !== 'None' ? newRowData['bo'] : newRowData['popl_2']
          break;
        case 'beta':
          fieldValue = newRowData['alpha'] !== 'None' ? newRowData['alpha'] : newRowData['popl_2']
          break;
        default:
          break;
      }
      const date1 = new Date(dateFor(fieldValue));
      const date2 = new Date(newDate);
      const diffTime = date2 - date1;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        handleTableData(data);
      }else{
        notify()
      }
    }

  };

  const milestoneTemplate = () => {
    return "Date";
  };

  const notify = () => toast.error('Invalid Date!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "colored",
    });

  return (
    <div>
      <div className="card">
        <ToastContainer />
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
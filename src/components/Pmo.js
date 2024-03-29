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
    console.log('e', e)
    console.log('data', data)
    let fieldValue = '';
    let nextValue = '';
    switch (field) {
      case 'popl_3':
        fieldValue = newRowData['popl_2']
        nextValue = newRowData['po'] !== '' && newRowData['po'] !== 'None' ? newRowData['po'] : newRowData['prq'];
        break;
      case 'po':
        fieldValue = newRowData['popl_3'] !== 'None' ? newRowData['popl_3'] : newRowData['popl_2']
        nextValue = newRowData['es'] !== '' && newRowData['es'] !== 'None' ? newRowData['es'] : newRowData['prq'];
        break;
      case 'es':
        fieldValue = newRowData['po'] !== 'None' ? newRowData['po'] : newRowData['popl_2']
        nextValue = newRowData['ao'] !== '' && newRowData['ao'] !== 'None' ? newRowData['ao'] : newRowData['prq'];
        break;
      case 'ao':
        fieldValue = newRowData['es'] !== 'None' ? newRowData['es'] : newRowData['popl_2']
        nextValue = newRowData['bo'] !== '' && newRowData['bo'] !== 'None' ? newRowData['bo'] : newRowData['prq'];
        break;
      case 'bo':
        fieldValue = newRowData['ao'] !== 'None' ? newRowData['ao'] : newRowData['popl_2']
        nextValue = newRowData['alpha'] !== '' && newRowData['alpha'] !== 'None' ? newRowData['alpha'] : newRowData['prq'];
        break;
      case 'alpha':
        fieldValue = newRowData['bo'] !== 'None' ? newRowData['bo'] : newRowData['popl_2']
        nextValue = newRowData['beta'] !== '' && newRowData['beta'] !== 'None' ? newRowData['beta'] : newRowData['prq'];
        break;
      case 'beta':
        fieldValue = newRowData['alpha'] !== 'None' ? newRowData['alpha'] : newRowData['popl_2']
        nextValue = newRowData['prq'];
        break;
      case 'prq':
        fieldValue = newRowData['beta'] !== 'None' ? newRowData['beta'] : newRowData['popl_2']
        nextValue = newRowData['pv'];
        break;
      case 'pv':
        fieldValue = newRowData['prq'] !== 'None' ? newRowData['prq'] : newRowData['popl_2']
        break;
      case 'popl_2':
        fieldValue = newRowData['popl_3'] !== 'None' ? newRowData['popl_3'] : newRowData['pv']
        break;
      default:
        break;
    }
    const date1 = new Date(dateFor(fieldValue));
    const date2 = new Date(newDate);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    console.log('nextValue', nextValue)
    const nextDate = new Date(dateFor(nextValue));
    const nextdiffTime = nextDate - date2;
    const nextdiffDays = Math.ceil(nextdiffTime / (1000 * 60 * 60 * 24));

    console.log('diffDays', diffDays)
    console.log('nextdiffDays', nextdiffDays)

    if ((field === 'popl_2' && diffDays < 0) || (field === 'pv' && diffDays > 0) || (field !== 'pv' && diffDays > 0 && nextdiffDays > 0)) {
      handleTableData(data);
      console.log('ddd')
    } else {
      notify()
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
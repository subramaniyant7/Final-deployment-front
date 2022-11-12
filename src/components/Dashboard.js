import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import TableInfo from "./TableInfo";
import Pmo from "./Pmo";
import { TabMenu } from "primereact/tabmenu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Data,
  SummaryColumns,
  SummaryData,
  PMOColumns,
  Developement
} from "../data";
import { loadData } from "../features/tableInfo";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Column } from "primereact/column";
import Api from "../service/Api";
import { Toolbar } from "primereact/toolbar";
import { exports, modes, items, columns } from '../shared/utils'
import DialogComponent from './DialogModal'

const Dashboard = () => {
  const toast = useRef(null);
  const navigate = useNavigate();

  // Internal State
  const [activeIndex, setActiveIndex] = useState(0);
  const [productDialog, setProductDialog] = useState(false);
  const [columnEdit, setColumnEdit] = useState(false);
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [getTableData, setGetgetTableData] = useState([]);
  const userStore = useSelector((state) => state.userInfo);
  const [error, setError] = useState("");
  const [selectedMode, setSelectedMode] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [pmoData, setPMOData] = useState([]);
  const [budgetData, setbudgetData] = useState([]);


  const [submitDisable, setSubmitDisable] = useState(true);
  const [modalShow, setModalShow] = useState(false)

  // Redux
  const tableInfo = useSelector((state) => state.tableInfo);
  const dispatch = useDispatch();

  const CustomComponent = () => {
    let componentRender = "";
    switch (activeIndex) {
      case 0:
        componentRender = (
          <Pmo
            columns={PMOColumns}
            data={pmoData}
            colEdit={columnEdit}
            handleTableData={handlePmoChangeData}
          />
        );
        break;
      case 4:
        componentRender = (
          <TableInfo
            columns={SummaryColumns}
            data={budgetData}
            handleTableData={submitpmo}
          />
        );
        break;
      default:
        break;
    }
    return componentRender;
  };


  const handlePmoChangeData = (data) => {
    setSubmitDisable(false);
    setPMOData([data])
  }

  const handleSubmitData = () => {
    console.log({ ...pmoData })
    submitpmo(pmoData[0])
  }

  const handleTableData = (data) => {
    const newTableInfo = tableInfo.map((table, index) => {
      if (index === data.rowIndex) {
        return { ...table, ...data.newRowData };
      }
      return table;
    });
    dispatch(loadData(newTableInfo));
  };

  const handleColumnEdit = () => {
    setColumnEdit(true);
  };

  const handleCancelEdit = () => {
    setColumnEdit(false);
  };
  const onModeChange = (e) => {
    const data = {
      project_id: userStore.project_name.project_id,
      mode: e.value.name,
    };
    Api.post("/filter_milestone", data).then((res) => {
      const response = res;
      if (response.status == 200) {
        // Handle Response
      }
    });
    setSelectedMode(e.value);
  };

  const submitpmo = (data) => {
    let url = "";
    // Api call for submit
    if (activeIndex === 0) {

      setSubmitDisable(true);

      // Api.post("/insert_update_milestone_date", data).then((res) => {
      //   const response = res;
      //   if (response.status == 200) {
      //     // Handle Response
      //     // Updating data after success in API
      //     if (activeIndex === 0) {
      //       getPMOData();
      //     }
      //     if (activeIndex !== 0) {
      //       getApiData();
      //     }
      //   }
      // });
      console.log('data', data)
      setPMOData([data])
    }

    if (activeIndex === 1) {
      url = "/insert_update_records"; // change url
    }
    if (activeIndex === 2) {
      url = "/insert_update_records"; // change url
    }
    if (activeIndex === 3) {
      url = "/insert_update_records"; // change url
    }

    if (activeIndex !== 0 && activeIndex !== 4) {

      Api.post(url, { data: [data] }).then((res) => {
        const response = res;
        if (response.status == 200) {
          // Handle Response
          // Updating data after success in API
          if (activeIndex === 0) {
            getPMOData();
          }
          if (activeIndex !== 0) {
            getApiData();
          }
        }
      });
    }
    setColumnEdit(false);
  };

  // Create New Action
  const createNewAction = (data) => {
    // Api.post("/insert_update_milestone_date", data).then((res) => {
      //   const response = res;
      //   if (response.status == 200) {
      //     // Handle Response
      //     // Updating data after success in API
      //     if (activeIndex === 0) {
      //       getPMOData();
      //     }
      //     if (activeIndex !== 0) {
      //       getApiData();
      //     }
      //   }
      // });
      setModalShow(false)
  }

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="" rowSpan={1} colSpan={12} />
        <Column header="SI Milestone" colSpan={3} />
        <Column header="PO" />
        <Column header="A1" />
        <Column header="PRQ" />
      </Row>
      <Row>
        <Column header="" rowSpan={1} colSpan={12} />
        <Column header="PX Milestone" colSpan={3} />
        <Column header="Alpha" />
        <Column header="Beta" />
        <Column header="PV" />
      </Row>
      <Row>
        {columns.map((column) => {
          return <Column header={column.header} />;
        })}
      </Row>
    </ColumnGroup>
  );


  const openNew = () => {
    console.log('event')
    setModalShow(true);
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        {activeIndex !== 0 && activeIndex !== 4 ? (
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-raised p-button-rounded mb-2 mr-2"
            style={{
              backgroundColor: "transparent",
              float: "left",
              color: "grey",
              border: "1px solid",
              borderRadius: "2rem",
              fontWeight: "700",
            }}
            onClick={openNew} />
        ) : null}
        {activeIndex === 0 ? (
          <div>
            <span style={{ fontWeight: "600", fontSize: "18px" }}>
              Modes:
              <Dropdown
                className="ml-2"
                value={selectedMode}
                options={modes}
                onChange={onModeChange}
                optionLabel="name"
                placeholder="Select a Mode"
              />
            </span>
          </div>
        ) : null}


        {/* {activeIndex !== 0 && activeIndex !== 4 ? (
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-rounded p-button-secondary mr-2"
            style={{ backgroundColor: "#405685" }}
            onClick={openNew}
          />
        ) : null} */}
      </React.Fragment>
    );
  };

  //Export Excel
  const handleExport = (e) => {
    if (e.value === "xls") {
      axios({
        url: 'http://10.49.3.7:5000/download',
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.xls'); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    }
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {activeIndex !== 0 && activeIndex !== 4 ? (
          <Dropdown
            className="p-button-raised p-button-rounded mb-2 mr-2"
            style={{
              color: "grey",
              border: "1px solid",
              borderRadius: "2rem",
              fontWeight: "700",
            }}
            value={selectedCity1}
            options={exports}
            // onClick={exportExcel}
            onChange={handleExport}
            optionLabel="name"
            icon="pi pi-upload"
            placeholder="Export"
            colEdit={columnEdit}
          />
        ) : null}

        {activeIndex !== 4 && columnEdit ? (
          <Button
            className="p-button-rounded p-button-outlined mb-2"
            icon="pi pi-times"
            style={{ color: "grey" }}
            onClick={handleCancelEdit}
          />
        ) : (
          <Button
            label="Edit"
            className="p-button-rounded p-button-outlined mb-2"
            icon="pi pi-user-edit"
            style={{ color: "grey" }}
            onClick={handleColumnEdit}
          />
        )}
      </React.Fragment>
    );
  };

  const getApiData = (data) => {
    let url = "";

    if (activeIndex === 1) {
      url = "/get_dev";
    }
    if (activeIndex === 2) {
      url = "/get_val";
    }
    if (activeIndex === 3) {
      url = "/get_hor";
    }
    if (activeIndex !== 0 && activeIndex !== 4) {
      Api.get(url)
        .then((res) => {
          setGetgetTableData(res.data.data);
        })
        .catch((error) => {
          setError(error);
        });
      setGetgetTableData(Developement)
    }
    if (activeIndex === 4) {
      setbudgetData(SummaryData);
      // Api.post("/get_budget", {project_id:userStore.project_name.project_id}).then((res) => {
      //       const response = res;
      //       if (response.status == 200) {
      //         setbudgetData(res.data.data);

      //         // Handle Response
      //       }
      //     });
    }


  };

  const getPMOData = () => {

    // Actual API Call
    // Api.get("/get_milestone_date")
    //   .then((res) => {
    //     setPMOData(res.data.data);
    //   })
    //   .catch((error) => {
    //     setError(error);
    //   });


    setPMOData([{
      alpha: "None", ao: "None", beta: "None", bo: "None", es: "None", milestone_id: 1, mode: "High", po: "None", popl_2: "01/10/2022", popl_3: "None", project_id: 2, prq: "31/10/2022"
      , pv: "15/7/2021"
    }])
  };

  const closeModal = () => {
    setModalShow(false)
  }

  useEffect(() => {
    if (activeIndex !== 0) {
      getApiData();
    }
    if (activeIndex === 0) {
      getPMOData();
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!userStore.hasOwnProperty("useremail")) {
      navigate("/");
    }
    dispatch(loadData(Data));
  }, [userStore]);


  return (
    <div className="datatable-editing-demo">
      <Toast ref={toast} />
      {
        modalShow && 
          <DialogComponent 
            activeIndex={activeIndex} 
            selectedMode={selectedMode}
            showModal={modalShow} 
            closeModal={closeModal} 
            createNewAction={createNewAction}/>
      }
      <div>
        <div className="card">
          <TabMenu
            model={items}
            activeIndex={activeIndex}
            onTabChange={(e) => {
              setActiveIndex(e.index);
            }}
          />
        </div>
      </div>

      <div>
        {activeIndex !== 4 ? (
          <Toolbar
            className="mb-2 pt-2 pb-2"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>
        ) : null}

        <CustomComponent />
        {activeIndex !== 0 && activeIndex !== 4 ? (
          <TableInfo
            columns={columns}
            data={getTableData}
            colEdit={columnEdit}
            custHeader={true}
            customHeader={headerGroup}
            handleTableData={submitpmo}
          />
        ) : null}
      </div>
      {activeIndex !== 4 ? (
        <Button
          label="Submit"
          onClick={activeIndex === 0 ? handleSubmitData : submitpmo}
          aria-label="Submit"
          style={{
            display: "flex",
            float: "right",
            backgroundColor: "#405685",
          }}
          disabled={activeIndex === 0 ? submitDisable : false}
        />
      ) : null}
    </div>
  );
};

export default Dashboard;
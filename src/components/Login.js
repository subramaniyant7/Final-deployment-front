import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Roles, Users } from "./Roles";
import { Notification } from "../shared/Notification";
import { useDispatch } from "react-redux";
import { signIn } from "../features/loggedIn";
import { userData } from "../features/userInfo";
import { Dropdown } from "primereact/dropdown";
import Api from "../service/Api";
import { login } from "../service/Config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMessage, setShowMessage] = useState(false);
  const [selectedMilestone1, setSelectedMilestone1] = useState(null);
  const [error, setError] = useState("");
  const [projectList, setProjectList] = useState([]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      project_name: ""
    },
    validate: (data) => {
      let errors = {};
      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      if (!data.password) {
        errors.password = "Password is required.";
      }
      if (!data.project_name) {
        errors.project_name = "Please select project";
      }
      return errors;
    },
    onSubmit: (data) => {
      console.log(data);

      dispatch(signIn());
      dispatch(userData({ useremail: data.email, project_name: selectedMilestone1 }));
      navigate("/dashboard");



      // delete data.project_name
      // // Api call for login
      // Api.post(login, data).then((res) => {
      //   console.log(res, "this is response");
      //   const response = res;
      //   if (response.status == 200) {
      //     dispatch(signIn());
      //     dispatch(userData({ useremail: response.data.data.email, project_name: selectedMilestone1 }));
      //     navigate("/dashboard");
      //   }

      //   if (response.error === 'Unauthorized') {
      //     notify(response.error)
      //   }
      // }).catch(error => {
      //   setError(error)
      // });


      // let userExist = Users.filter((user) => user.email === data.error);
      // console.log(userExist, "this is userE")
      // if(userExist){
      //   setShowMessage(true);
      // }

      // let userExist = Users.filter((user) => user.email === data.email);
      // if (!userExist.length) {
      //   setShowMessage(true);
      // }
      // console.log(userExist);
      // if (userExist.length) {
      //   dispatch(signIn());
      //   dispatch(userData({ useremail: data.email }));
      //   navigate("/dashboard");
      // }
      // console.log(userExist);
      formik.resetForm();
    },
  });


  const notify = (error) => toast.error(error, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "colored",
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const projects = [
    { project_id: 1, project_name: "Project 1" },
  ];

  useEffect(() => {
    // Api.get('/project_list').then(res => {
    //   console.log(res)
    //     setProjectList(res.data.data)
    // }).catch(error => {
    //   setError(error);
    // })
    setProjectList(projects);
  }, []);

  useEffect(() => {
    if (error !== "") {
      return <Notification type="error" message={error} />;
    }
  }, [error]);

  const onMilestoneChange = (e) => {
    setSelectedMilestone1(e.target.value);
  };
  return (
    <div className="ui-grid-col-8">
      {showMessage && <Notification type="error" message="User not found" />}
      <ToastContainer />
      <div className="form-demo">
        <div className="flex justify-content-center">
          <div className="card">
            <h5 className="text-center">Login</h5>
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className="field">
                <span className="p-float-label p-input-icon-right">
                  <InputText
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("email"),
                    })}
                  />
                  <label
                    htmlFor="email"
                    className={classNames({
                      "p-error": isFormFieldValid("email"),
                    })}
                  >
                    Email*
                  </label>
                </span>
                {getFormErrorMessage("email")}
              </div>
              <div className="field">
                <span className="p-float-label p-input-icon-right">
                  <Password
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    feedback={false}
                  />
                  <label
                    htmlFor="password"
                    className={classNames({
                      "p-error": isFormFieldValid("password"),
                    })}
                  >
                    Password*
                  </label>
                </span>
                {getFormErrorMessage("password")}
              </div>
              <div className="field">
                <span className="p-float-label p-input-icon-right">
                  <Dropdown
                    className="test"
                    name="project_name"
                    value={selectedMilestone1}
                    options={projectList}
                    // onChange={onMilestoneChange}
                    onChange={(e) => { formik.setFieldValue([e.target.name], e.target.value.project_id); setSelectedMilestone1(e.target.value) }}

                    variant="outlined info"
                    optionLabel="project_name"
                    placeholder="Select Project"
                  />
                </span>
                {getFormErrorMessage("project_name")}
              </div>

              <Button
                type="submit"
                style={{ backgroundColor: "#405685", color: "white" }}
                label="Submit"
                className="mt-2"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

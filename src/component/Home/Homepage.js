import React, { useState, useEffect } from "react";
import "./homepage.css";
import { Button, Modal } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

export default function Home() {
  const Api_routes = "http://localhost:8000/api/"
  const [contactmodel, addcontactmodel] = useState(false);
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState({});
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    getAllContact()
  },[])

  const getAllContact = ()=> {
    axios
    .get(`${Api_routes}contact/find`)
    .then((res) => {
      console.log("data",res);
      
    })
    .catch((error) => {
      alert("get data error");
    });
  }


  const handleContactmodal = () => {
    addcontactmodel(!contactmodel);
  };

  const handleClose = () => {
    setShow(false);
  };

  const AddContact = async (e) => {
    e.preventDefault();
    const payload = {
      Firstname: inputValue?.Firstname,
      lastname: inputValue?.lastname,
      phone: inputValue?.phone,
    };
    axios
    .post(`wwww`,payload)
    .then((res) => {
      alert("wsf !!!");
    })
    .catch((error) => {
      alert("add api error");
    });
  };
  const handleDeleteAnnouncement = () => {
    // Todo DELETE API
    axios
    .delete(`delete`)
    .then((res) => {
      alert("Data get Successfully !!!");
      setShow(false);
    })
    .catch((error) => {
      alert("delete api error");
    });
  };
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center pt-3 pb-5">
          <h3>
            <i className="fa fa-address-book"></i>
            <span className="m-3">Phone Book App </span>
          </h3>
        </div>

        <div className="d-flex justify-content-between">
          <h4>Contacts</h4>
          <button
            onClick={(e) => handleContactmodal()}
            type="button"
            class="btn btn-primary"
          >
            + Add Contact
          </button>
        </div>

        <div className="mt-4">
          <form>
            <div className="form-group " id="input-container">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search for contact by last name..."
              />
            </div>
          </form>
        </div>

        <div className="mt-4">
          <ul class="list-group">
            {[1, 2, 3, 5, 6]?.map((item) => {
              return (
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>Eric Elliot</h5>
                    <span className="light-gray">
                      <i class="fa-solid fa-phone phone-style"></i>222-555-6579
                    </span>
                  </div>

                  <button
                    onClick={(e) => setShow(true)}
                    type="button"
                    class="btn btn-danger"
                  >
                    {" "}
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this conatct?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteAnnouncement();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {contactmodel ? (
        <>
          <Dialog
            fullScreen
            open={contactmodel}
            onClose={handleContactmodal}
            //   TransitionComponent={Transition}
          >
            <div className="p-2 d-flex justify-content-start">
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleContactmodal}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </div>

            <div className="gap">
              <List>
                <div className="form-group row mt-4">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    First name
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="First-name"
                        name="Firstname"
                        value={inputValue?.Firstname}
                        onChange={(e) => {
                          handleOnChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group row mt-4">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    last name
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="last-name"
                        name="lastname"
                        value={inputValue?.lastname}
                        onChange={(e) => {
                          handleOnChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group row mt-4">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Phone number
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="number"
                        className={`form-control form-control-lg form-control-solid `}
                        id="phone"
                        name="phone"
                        value={inputValue?.phone}
                        onChange={(e) => {
                          handleOnChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => AddContact(e)}
                    className="btn  btn-success mt-5"
                  >
                    <span>Add Contact</span>
                  </button>
                </div>
              </List>
            </div>
          </Dialog>
        </>
      ) : null}
    </>
  );
}

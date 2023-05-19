/* eslint-disable */
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import bcrypt from "bcrypt";
import axios from "axios";
import { FloatingLabel, Form, Button } from "react-bootstrap";

import { signUpUser } from "../redux/modules/user/index";
import "../scss/SignUp.scss";

function SignUp() {
  return (
    <form className="frame" name="signUpForm" method="post">
      <FormFloatingBasicExample /> <SizesExample />
    </form>
  );
}

function FormFloatingBasicExample(): JSX.Element {
  const dispatch = useDispatch();
  const selector = useSelector((state) => {});
  return (
    <div className="box">
      <tr>
        <td>
          <FloatingLabel controlId="floatingInput" label="Id" className="mb1">
            <Form.Control type="Id" placeholder="Id" value={} onChange={} />
          </FloatingLabel>
        </td>
        <td>
          <button className="cbtn">Confirm Id</button>
        </td>
      </tr>

      <tr>
        <td>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb1"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={}
            />
          </FloatingLabel>
        </td>
        <td>
          <button className="cbtn">Confirm Email</button>
        </td>
      </tr>

      <FloatingLabel controlId="floatingInput" label="Name" className="mb3">
        <Form.Control type="Name" placeholder="name" value={} onChange={} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Nick Name"
        className="mb4"
      >
        <Form.Control
          type="nick Name"
          placeholder="nick name"
          value={}
          onChange={}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        className="pass1"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          value={}
          onChange={}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPasswordConfirm"
        label="Password Confirm"
        className="pass2"
      >
        <Form.Control
          type="password"
          placeholder="Password Confirm"
          value={}
          onChange={}
        />
      </FloatingLabel>
    </div>
  );
}

function SizesExample() {
  let navigate = useNavigate();
  return (
    <>
      <div className="signBtn">
        <Button variant="primary" size="sm" type="submit">
          Sign Up
        </Button>{" "}
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            navigate("/");
          }}
          size="sm"
        >
          Close
        </Button>
      </div>
    </>
  );
}
export default SignUp;

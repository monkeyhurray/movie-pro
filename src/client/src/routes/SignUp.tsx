/* eslint-disable */
import { connect, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import bcrypt from "bcrypt";
import {
  FloatingLabel,
  Form,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import User from "../../../server/models/User";

import "../scss/SignUp.scss";

interface SignUpRequestBody {
  id: string;
  email: string;
  name: string;
  userName: string;
  password: string;
  password2: string;
  gender: string;
}

interface FormFloatingBasicExampleProps {
  values: {
    id: string;
    email: string;
    name: string;
    userName: string;
    password: string;
    password2: string;
    gender: string;
  };
}

function SignUp() {
  let [user, setUser] = useState(User);
  let [values, setValues] = useState({
    id: "",
    email: "",
    name: "",
    userName: "",
    password: "",
    password2: "",
    gender: "",
  });

  const handleSignUpSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const requestBody: SignUpRequestBody = {
      id: form.id.value,
      email: form.email.value,
      name: form.name.value,
      userName: form.userName.value,
      password: form.password.value,
      password2: form.password2.value,
      gender: form.gender.value,
    };

    //고치기
    try {
      const response = await fetch("http://localhost:5000/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        window.location.href = "/Login";
      } else {
        throw new Error("Failed to sign up.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="frame"
      name="signUpForm"
      method="post"
      onSubmit={handleSignUpSubmit}
    >
      <FormFloatingBasicExample values={values} /> <SizesExample />
    </form>
  );
}

function FormFloatingBasicExample(
  props: FormFloatingBasicExampleProps
): JSX.Element {
  return (
    <div className="box">
      <tr>
        <td>
          <FloatingLabel controlId="floatingInput" label="Id" className="mb1">
            <Form.Control type="Id" placeholder="Id" />
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
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
        </td>
        <td>
          <button className="cbtn">Confirm Email</button>
        </td>
      </tr>

      <FloatingLabel controlId="floatingInput" label="Name" className="mb3">
        <Form.Control
          type="Name"
          placeholder="name"
          value={props.values.name}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Nick Name"
        className="mb4"
      >
        <Form.Control
          type="nick Name"
          placeholder="nick name"
          value={props.values.userName}
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
          value={props.values.password}
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
          value={props.values.password2}
        />
      </FloatingLabel>
      <tr>
        <td>
          <FloatingLabel
            controlId="floatingInput"
            label="gender"
            className="mb2"
          >
            <Form.Control
              type="gender"
              placeholder="gender"
              value={props.values.gender}
            />
          </FloatingLabel>
        </td>
        <td>
          <BasicButtonExample />
        </td>
      </tr>
    </div>
  );
}

function BasicButtonExample() {
  return (
    <DropdownButton id="dropdown-basic-button" title="Gender">
      <Dropdown.Item eventKey="male">male</Dropdown.Item>
      <Dropdown.Item eventKey="female">female</Dropdown.Item>
    </DropdownButton>
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

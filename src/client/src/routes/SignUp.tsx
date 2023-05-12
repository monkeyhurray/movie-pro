/* eslint-disable */
import { connect, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import bcrypt from "bcrypt";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../scss/SignUp.scss";

type FormProps = {
  id: string;
  email: string;
  name: string;
  userName: string;
  password: string;
  password2: string;
  onIdChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUserNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPassword2Change: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function SignUp() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [values, setValues] = useState<FormProps>({
    id: "",
    email: "",
    name: "",
    userName: "",
    password: "",
    password2: "",
    onIdChange: handleChange("id"),
    onEmailChange: handleChange("email"),
    onNameChange: handleChange("name"),
    onUserNameChange: handleChange("userName"),
    onPasswordChange: handleChange("password"),
    onPassword2Change: handleChange("password2"),
  });

  function handleChange(key: keyof FormProps) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prevValues) => ({
        ...prevValues,
        [key]: e.currentTarget.value,
      }));
    };
  }

  function registerUser(dataTosubmit) {
    const request = axios.post("/Login", dataTosubmit).then((res) => res.data);
    return {
      type: { register: action.payload },
      payload: request,
    };
  }
  const onSubmitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (values.password !== values.password2) {
      return alert("비밀번호와 비밀번호확인은 같아야 합니다.");
    }
    let body = {
      id: values.id,
      email: values.email,
      name: values.name,
      userName: values.userName,
      password: values.password,
      password2: values.password2,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };
  //onSubmitHandler와 registerUser손보기

  return (
    <form className="frame" name="signUpForm" method="post">
      <FormFloatingBasicExample {...values} /> <SizesExample />
    </form>
  );
}

function FormFloatingBasicExample(props: FormProps): JSX.Element {
  return (
    <div className="box">
      <tr>
        <td>
          <FloatingLabel controlId="floatingInput" label="Id" className="mb1">
            <Form.Control
              type="Id"
              placeholder="Id"
              value={props.id}
              onChange={props.onIdChange}
            />
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
              onChange={props.onEmailChange}
            />
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
          value={props.name}
          onChange={props.onNameChange}
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
          value={props.userName}
          onChange={props.onUserNameChange}
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
          value={props.password}
          onChange={props.onPasswordChange}
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
          value={props.password2}
          onChange={props.onPasswordChange}
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

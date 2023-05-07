/* eslint-disable */
import {
  FloatingLabel,
  Form,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../scss/SignUp.scss";

function SignUp() {
  return (
    <div className="frame">
      <FormFloatingBasicExample /> <SizesExample />
    </div>
  );
}

function FormFloatingBasicExample(): JSX.Element {
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
        <Form.Control type="Name" placeholder="name" />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Nick Name"
        className="mb4"
      >
        <Form.Control type="nick Name" placeholder="nick name" />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        className="pass1"
      >
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPasswordConfirm"
        label="Password Confirm"
        className="pass2"
      >
        <Form.Control type="password" placeholder="Password Confirm" />
      </FloatingLabel>
      <tr>
        <td>
          <FloatingLabel
            controlId="floatingInput"
            label="gender"
            className="mb2"
          >
            <Form.Control type="gender" placeholder="gender" />
          </FloatingLabel>
        </td>
        <td>
          <BasicButtonExample />
        </td>
      </tr>
    </div>
  );
}

function SizesExample() {
  let navigate = useNavigate();
  return (
    <>
      <div className="signBtn">
        <Button variant="primary" size="sm">
          Sign Up
        </Button>{" "}
        <Button
          variant="secondary"
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
function BasicButtonExample() {
  return (
    <DropdownButton id="dropdown-basic-button" title="Gender">
      <Dropdown.Item href="male">male</Dropdown.Item>
      <Dropdown.Item href="female">female</Dropdown.Item>
    </DropdownButton>
  );
}

export default SignUp;

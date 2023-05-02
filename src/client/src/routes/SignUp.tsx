/* eslint-disable */
import { FloatingLabel, Form, Button } from "react-bootstrap";
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
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb1"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
        </td>
        <td>
          <button className="btn">Confirm Email</button>
        </td>
      </tr>

      <FloatingLabel
        controlId="floatingInput"
        label="Nick Name"
        className="mb-3"
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
      >
        <Form.Control type="password" placeholder="Password Confirm" />
      </FloatingLabel>
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
export default SignUp;

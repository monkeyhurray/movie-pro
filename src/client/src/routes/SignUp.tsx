/* eslint-disable */
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function SignUp() {
  return (
    <>
      <FormFloatingBasicExample /> <SizesExample />
    </>
  );
}

function FormFloatingBasicExample() {
  return (
    <>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password Confirm">
        <Form.Control type="password" placeholder="Password Confirm" />
      </FloatingLabel>
    </>
  );
}

function SizesExample() {
  let navigate = useNavigate();
  return (
    <>
      <div>
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

/* eslint-disable */
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../scss/Login.scss";

function Login(): JSX.Element {
  return (
    <div className="loginPage">
      <FormGroupExample />
    </div>
  );
}

function OutlineTypesExample(): JSX.Element {
  let navigate = useNavigate();
  return (
    <>
      <Button variant="outline-primary">Login</Button>{" "}
      <Button
        type="button"
        onClick={() => {
          navigate("/SignUp");
        }}
        variant="outline-secondary"
      >
        Sign Up
      </Button>{" "}
      <Button variant="outline-success">Log in as GitHub</Button>{" "}
    </>
  );
}

function FormGroupExample(): JSX.Element {
  return (
    <div className="id">
      <>
        <Form className="formId">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
      </>
      <OutlineTypesExample />
    </div>
  );
}

export default Login;

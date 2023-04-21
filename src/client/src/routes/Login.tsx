/* eslint-disable */
import { Form } from "react-bootstrap";
function Login(): JSX.Element {
  return (
    <div className="loginPage">
      <FormGroupExample />
    </div>
  );
}

function FormGroupExample(): JSX.Element {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
    </Form>
  );
}

export default Login;

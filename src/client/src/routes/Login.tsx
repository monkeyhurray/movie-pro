/* eslint-disable */
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logInUser, setId, setPassword } from "../redux/modules/user/logInUser";
import "../scss/Login.scss";
import { RootState } from "../../src/redux/store";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.logInUser.id);
  const password = useSelector((state: RootState) => state.logInUser.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logInUser({ id, password }));
    // 로그인 요청 보내기
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });

    if (response.ok) {
      // 로그인 성공 시 홈으로 리다이렉트
      navigate("/");
    } else {
      // 로그인 실패 시 에러 처리
      alert("로그인에 실패하셨습니다.");
      console.error("로그인 실패");
    }
  };
  return (
    <form className="loginPage" action="/login" method="post">
      <FormGroupExample />
    </form>
  );
}

function FormGroupExample(): JSX.Element {
  return (
    <div className="id">
      <>
        <Form className="formId">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control type="id" placeholder="id" />
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

function OutlineTypesExample(): JSX.Element {
  let navigate = useNavigate();
  return (
    <>
      <Button variant="outline-primary" type="submit">
        Login
      </Button>{" "}
      <Button
        onClick={() => {
          navigate("/signUp");
        }}
        variant="outline-secondary"
      >
        Sign Up
      </Button>{" "}
      <Button variant="outline-success">Login as GitHub</Button>{" "}
    </>
  );
}
export default Login;

import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logInUser, setId, setPassword } from "../redux/modules/user/logInUser";
import { setLoginStay } from "../redux/modules/user/confirmUser";
import "../scss/Login.scss";
import { RootState } from "../../src/redux/store";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import React from "react";

type MyDispatch = ThunkDispatch<RootState, Action<string>, Action<string>>;

function Login(): JSX.Element {
  const { id, password } = useSelector((state: RootState) => state.logInUser);
  const navigate = useNavigate();
  const dispatch: MyDispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id === "" || password === "") {
      alert("ID와 비밀번호를 입력해주세요.");
      return;
    }
    try {
      const dataToSubmit = {
        id,
        password,
      };

      await dispatch(logInUser(dataToSubmit));
      dispatch(setLoginStay(true));

      navigate("/");
      console.log("로그인이 되었습니다.");
    } catch (error) {
      console.log("로그인 중 오류가 발생하였습니다.");
    }
  };
  return (
    <form
      className="loginPage"
      name="loginForm"
      method="post"
      onSubmit={handleLogin}
    >
      <div>
        <FormGroupExample />
      </div>
      <OutlineTypesExample />
    </form>
  );
}

function FormGroupExample(): JSX.Element {
  const dispatch = useDispatch();
  const { id, password } = useSelector((state: RootState) => state.logInUser);

  return (
    <div className="id">
      <>
        <div className="formId">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              placeholder="Id"
              value={id}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setId(e.target.value))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setPassword(e.target.value))
              }
            />
          </Form.Group>
        </div>
      </>
    </div>
  );
}

function OutlineTypesExample(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div>
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
    </div>
  );
}
export default Login;

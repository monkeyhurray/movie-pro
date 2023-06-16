/* eslint-disable */
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  MyActionType,
  logInUser,
  setId,
  setPassword,
} from "../redux/modules/user/logInUser";
import { setMember } from "../redux/modules/user/confirmUser";
import "../scss/Login.scss";
import { RootState } from "../../src/redux/store";

type MyDispatch = ThunkDispatch<RootState, unknown, MyActionType>;

function Login(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, password } = useSelector((state: RootState) => state.logInUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id === "" || password === "") {
        alert("ID와 비밀번호를 입력해주세요.");
        return navigate("/login");
      }

      const dataToSubmit = {
        id,
        password,
      };

      await (dispatch as MyDispatch)(logInUser(dataToSubmit));
      console.log(id);
      dispatch(setMember(true));

      console.log("로그인이 되었습니다.");
      return navigate("/");
    } catch (error) {
      console.log("로그인 중 오류가 발생하였습니다.");
    }
  };

  return (
    <form className="loginPage" method="post">
      <div>
        <FormGroupExample />
      </div>
      <OutlineTypesExample handleSubmit={handleSubmit} />
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
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="id"
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

function OutlineTypesExample({
  handleSubmit,
}: {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}): JSX.Element {
  const navigate = useNavigate();

  return (
    <div>
      <Button variant="outline-primary" type="submit" onClick={handleSubmit}>
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
    </div>
  );
}
export default Login;

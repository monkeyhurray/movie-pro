import React from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../src/redux/store";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction, Action } from "redux";

import {
  setId,
  setEmail,
  setName,
  setUserName,
  setPassword,
  setPassword2,
  signUpConfirm,
} from "../redux/modules/user/signUpUser";

import "../scss/SignUp.scss";

function SignUp() {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<
    RootState,
    AnyAction,
    Action<string>
  > = useDispatch();

  const { id, email, name, userName, password, password2 } = useSelector(
    (state: RootState) => state.user
  );

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      console.log("Passwords do not match");
      return navigate("/signUp");
    }

    try {
      const dataToSubmit = { id, email, name, userName, password, password2 };

      await dispatch(signUpConfirm(dataToSubmit));

      console.log("회원가입 완료");
      navigate("/");
    } catch (error) {
      console.log("회원가입 중 오류 발생");
    }
  };

  return (
    <form
      className="frame"
      name="signUpForm"
      method="post"
      onSubmit={handleSignUp}
    >
      <div className="box">
        <FormFloatingBasicExample />
      </div>
      <SizesExample />
    </form>
  );
}

function FormFloatingBasicExample(): JSX.Element {
  const dispatch = useDispatch();

  const { id, email, name, userName, password, password2 } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <FloatingLabel controlId="floatingInput" label="ID" className="mb1">
              <Form.Control
                type="text"
                placeholder="ID"
                name="id"
                value={id}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setId(e.target.value))
                }
              />
            </FloatingLabel>
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
                name="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setEmail(e.target.value))
                }
              />
            </FloatingLabel>
          </td>
        </tr>
        <tr>
          <td>
            <FloatingLabel
              controlId="floatingInput"
              label="Name"
              className="mb1"
            >
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setName(e.target.value))
                }
              />
            </FloatingLabel>
          </td>
        </tr>
        <tr>
          <td>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb1"
            >
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setUserName(e.target.value))
                }
              />
            </FloatingLabel>
          </td>
        </tr>
        <tr>
          <td>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb1"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setPassword(e.target.value))
                }
              />
            </FloatingLabel>
          </td>
        </tr>
        <tr>
          <td>
            <FloatingLabel
              controlId="floatingPassword2"
              label="Confirm Password"
              className="mb1"
            >
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setPassword2(e.target.value))
                }
              />
            </FloatingLabel>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function SizesExample(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div>
      <Button className="btn2" variant="primary" size="lg" type="submit">
        Sign Up
      </Button>

      <Button
        className="btn2"
        onClick={() => {
          navigate("/");
        }}
      >
        Close
      </Button>
    </div>
  );
}
export default SignUp;

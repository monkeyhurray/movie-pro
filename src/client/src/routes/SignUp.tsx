/* eslint-disable */
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../src/redux/store";

import { FloatingLabel, Form, Button } from "react-bootstrap";

import {
  signUpUser,
  setId,
  setEmail,
  setName,
  setUserName,
  setPassword,
  setPassword2,
} from "../redux/modules/user/signUpUser";
import "../scss/SignUp.scss";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, email, name, userName, password, password2 } = useSelector(
    (state: RootState) => state.user
  );

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      console.log("Passwords do not match");
      return;
    }

    try {
      // 제출할 데이터
      const dataToSubmit = {
        id,
        email,
        name,
        userName,
        password,
        password2,
      };

      // signUpUser 액션 디스패치
      await (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(
        signUpUser(dataToSubmit)
      );
      console.log("회원가입 완료");
    } catch (error) {
      console.log("회원가입 중 오류 발생");
    }
  };

  const handleButtonClick = async () => {
    if (password !== password2) {
      console.log("Passwords do not match");
      // 비밀번호가 일치하지 않을 때 오류 처리
      return;
    }
    try {
      // 회원가입을 위한 데이터
      const dataToSubmit = {
        id,
        email,
        name,
        userName,
        password,
        password2,
      };

      // signUpUser 액션 디스패치
      await (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(
        signUpUser(dataToSubmit)
      );

      console.log("회원가입이 성공적으로 처리되었습니다.");
      navigate("/");
    } catch (error) {
      // 회원가입 실패 처리
      console.error("회원가입 중 오류가 발생했습니다.", error);
      // 이후 필요한 처리
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
      <SizesExample handleButtonClick={handleButtonClick} />
    </form>
  );
}

function FormFloatingBasicExample(): JSX.Element {
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  const { id, email, name, userName, password, password2 } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <FloatingLabel controlId="floatingInput" label="Id" className="mb1">
              <Form.Control
                type="text"
                placeholder="Id"
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

interface SizesExampleProps {
  handleButtonClick: () => void;
}

function SizesExample({ handleButtonClick }: SizesExampleProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        className="btn2"
        variant="primary"
        size="lg"
        onClick={handleButtonClick}
      >
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

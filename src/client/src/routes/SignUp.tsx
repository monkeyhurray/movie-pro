/* eslint-disable */
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../src/redux/store";
import bcrypt from "bcrypt";
import axios from "axios";
import { FloatingLabel, Form, Button } from "react-bootstrap";

import {
  signUpUser,
  setId,
  setEmail,
  setName,
  setUsername,
  setPassword,
  setPassword2,
} from "../redux/modules/user/signUpUser";
import "../scss/SignUp.scss";

function SignUp() {
  return (
    <form className="frame" name="signUpForm" method="post">
      <FormFloatingBasicExample />
    </form>
  );
}

function FormFloatingBasicExample(): JSX.Element {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

  const id = useSelector((state: RootState) => state.user.id);
  const email = useSelector((state: RootState) => state.user.email);
  const name = useSelector((state: RootState) => state.user.name);
  const username = useSelector((state: RootState) => state.user.username);
  const password = useSelector((state: RootState) => state.user.password);
  const password2 = useSelector((state: RootState) => state.user.password2);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 제출할 데이터
    const dataToSubmit = {
      id,
      email,
      name,
      username,
      password,
      password2,
    };

    // signUpUser 액션 디스패치
    await (dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(
      signUpUser(dataToSubmit)
    );
  };

  return (
    <div className="box">
      <tr>
        <td>
          <FloatingLabel controlId="floatingInput" label="Id" className="mb1">
            <Form.Control
              type="Id"
              placeholder="Id"
              value={id}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setId(e.target.value))
              }
            />
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
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setEmail(e.target.value))
              }
            />
          </FloatingLabel>
        </td>
        <td>
          <button className="cbtn">Confirm Email</button>
        </td>
      </tr>

      <FloatingLabel controlId="floatingInput" label="Name" className="mb3">
        <Form.Control
          type="text"
          placeholder="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setName(e.target.value))
          }
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Nick Name"
        className="mb4"
      >
        <Form.Control
          type="text"
          placeholder="nick name"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setUsername(e.target.value))
          }
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        className="pass1"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setPassword(e.target.value))
          }
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPasswordConfirm"
        label="Password Confirm"
        className="pass2"
      >
        <Form.Control
          type="password"
          placeholder="Password Confirm"
          value={password2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setPassword2(e.target.value))
          }
        />
      </FloatingLabel>
      <SizesExample handleSignUp={handleSignUp} />
    </div>
  );
}

function SizesExample({
  handleSignUp,
}: {
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  let navigate = useNavigate();
  return (
    <>
      <div className="signBtn">
        <Button
          variant="primary"
          size="sm"
          type="submit"
          onClick={() => handleSignUp}
        >
          Sign Up
        </Button>{" "}
        <Button
          variant="secondary"
          type="button"
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

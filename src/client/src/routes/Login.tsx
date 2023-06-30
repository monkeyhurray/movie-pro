/* eslint-disable */
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logInUser, setId, setPassword } from "../redux/modules/user/logInUser";
import { setMember } from "../redux/modules/user/confirmUser";
import "../scss/Login.scss";
import { RootState } from "../../src/redux/store";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

type MyDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
type UsersCookie = string | undefined;

function Login(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, password } = useSelector((state: RootState) => state.logInUser);

  const handleButtonClick = async (e: React.FormEvent) => {
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

      const cookies = document.cookie.split(";");
      let userCookie: UsersCookie;

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("userID=")) {
          userCookie = cookie.split("=")[1];
          break;
        }
      }

      if (userCookie) {
        dispatch(setMember(true));
      } else {
        console.log("userCookie에 담기지 않음");
        return navigate("/login");
      }

      console.log("로그인이 되었습니다.");
      return navigate("/");
    } catch (error) {
      console.log("로그인 중 오류가 발생하였습니다.");
    }
  };

  return (
    <form
      className="loginPage"
      action="/login"
      method="post"
      onSubmit={handleButtonClick}
    >
      <div>
        <FormGroupExample id={id} password={password} />
      </div>
      <OutlineTypesExample />
    </form>
  );
}

function FormGroupExample({
  id,
  password,
}: {
  id: string;
  password: string;
}): JSX.Element {
  const dispatch = useDispatch();

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
      <Button variant="outline-success">Login as GitHub</Button>{" "}
    </div>
  );
}
export default Login;

/* eslint-disable */
import React, { lazy, Suspense, useEffect, useState } from "react";
import { wiseSaying, num } from "./wiseSaying";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  Col,
  Image,
  Row,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Carousel,
  Spinner,
} from "react-bootstrap";
import { Action } from "redux";
import { userCookie, setGcookie } from "../src/redux/modules/user/userCookie";
import { setVideoId } from "./redux/modules/product/videoOwner";
import { setLoginStay } from "./redux/modules/user/confirmUser";
import { RootState } from "./redux/store";
import { getCookie } from "./cookie";
import "./scss/App.scss";
import "bootstrap/dist/css/bootstrap.css";

const Login = lazy(() => import("./routes/Login"));

const SignUp = lazy(() => import("./routes/SignUp"));
const MyPage = lazy(() => import("./routes/MyPage"));
const Upload = lazy(() => import("./routes/Upload"));
const See = lazy(() => import("./routes/See"));
const Moive = lazy(() => import("./routes/Movie"));
const Wise = lazy(() => import("./routes/WiseSaying"));

interface imgContentprops {
  imgContent: string;
}

interface UserConfirm {
  userConfirm: boolean;
  userId: string;
  userImg: string;
}

interface CarouselFadeExampleProps {
  login: boolean;
  imgContent: string;
  videoIdBox: string[];
}

function App() {
  const dispatch: ThunkDispatch<
    RootState,
    Action<string>,
    Action<string>
  > = useDispatch();
  const login = useSelector((state: RootState) => state.confirmUser.loginStay);

  const { videoId } = useSelector((state: RootState) => state.videoOwner);
  const [fileUrlId, setFileUrlId] = useState("");

  useEffect(() => {
    if (login) {
      userCookie(dispatch);
      let id: string = getCookie("videoId");
      if (id !== null) {
        dispatch(setVideoId(id));
      } else {
        dispatch(setGcookie(""));
      }
    } else {
      dispatch(setGcookie(""));
    }
  }, [dispatch, login]);

  useEffect(() => {
    const propFileUrlId = () => {
      setFileUrlId(videoId);
    };
    propFileUrlId();
  }, [videoId]);

  let videoIdBox: string[] = [];
  let storedData = localStorage.getItem("videoIdBox") as string;
  let parseStoredData = JSON.parse(storedData);

  if (videoId !== null) {
    videoIdBox.push(...parseStoredData, videoId);
  } else {
    videoIdBox.push(...parseStoredData);
  }

  videoIdBox = [...new Set(videoIdBox)];
  videoIdBox = videoIdBox.filter((i) => i !== null && i !== "");
  localStorage.setItem("videoIdBox", JSON.stringify(videoIdBox));

  const userConfirm: UserConfirm = getCookie("myToken");

  if (userConfirm !== undefined) {
    dispatch(setLoginStay(true));
  } else {
    dispatch(setLoginStay(false));
  }
  let img: string;

  if (login === true) {
    img = userConfirm.userImg;
  } else {
    img = "src\\client\\public\\img\\assets\\1998.jpg";
  }
  const imgContent = img.replace("src\\client\\public\\", "");

  return (
    <div className="App">
      <NavScrollExample imgContent={imgContent} />

      <Suspense fallback={<BorderExample />}>
        <Routes>
          <Route
            path="/"
            element={
              <CarouselFadeExample
                login={login}
                imgContent={imgContent}
                videoIdBox={videoIdBox}
              />
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          {login ? (
            <>
              <Route path="/user/myPage" element={<MyPage />} />
              <Route path="/user/logOut" />
              <Route path="/wise" element={<Wise />} />{" "}
              <Route path="/video/upload" element={<Upload />} />
              <Route
                path="/video/movie"
                element={<Moive fileUrlId={fileUrlId} />}
              />
              <Route path={"/video/movie/:id"} element={<See />} />
            </>
          ) : null}
          <Route
            path="*"
            element={
              <div>
                <img
                  style={{ maxHeight: 600, maxWidth: 1400 }}
                  src="img/assets/404.jpg"
                />
              </div>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

function BorderExample() {
  return <Spinner animation="border" />;
}

function NavScrollExample({ imgContent }: imgContentprops) {
  const login = useSelector((state: RootState) => state.confirmUser.loginStay);

  const navigate = useNavigate();

  return (
    <Navbar bg="light" className="navBar" expand="lg">
      <Container fluid>
        <Navbar.Brand>MoviePro</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/video/movie");
              }}
            >
              Movie
            </Nav.Link>
            <NavDropdown title="MovieInfo" id="navbarScrollingDropdown">
              <NavDropdown.Item
                onClick={() => {
                  navigate("/wise");
                }}
              >
                Wise Saying
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  navigate("/video/movie");
                }}
              >
                Movie
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            {login ? ( // logIn 상태에 따라 다른 내용 보여주기
              <>
                <Nav.Link
                  className="LoggedInContent"
                  onClick={() => {
                    navigate("/user/myPage");
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <h4>I'm</h4>
                    <ShapeExample imgContent={imgContent} />
                  </div>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="LoginButton"
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/signUp");
                  }}
                  className="SignUpButton"
                >
                  SignUp
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function CarouselFadeExample({ login, imgContent }: CarouselFadeExampleProps) {
  const navigate = useNavigate();

  return (
    <Carousel fade>
      <Carousel.Item className="poster">
        {login ? (
          <>
            <img
              className="d-blockw-100"
              width={900}
              height={500}
              src={"/" + imgContent}
              onClick={() => {
                navigate("/video/movie");
              }}
            />
          </>
        ) : (
          <img
            className="d-blockw-100"
            width={900}
            height={500}
            src={"/" + imgContent}
            onClick={() => {
              navigate("/video/movie");
            }}
          />
        )}
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="actorImg"
          src={wiseSaying[num].img}
          onClick={() => {
            navigate("/wise");
          }}
        />
        <div className="say">
          <h5>{wiseSaying[num].content}</h5>
          <h6>-{wiseSaying[num].actor}-</h6>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="App-video">
          <video
            className="video-Card-Body-content"
            src={"/video\\intoLove.mp4"}
            controls
          ></video>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

function ShapeExample({ imgContent }: imgContentprops) {
  return (
    <Container>
      <Row>
        <Col xs={3} md={2}>
          <Image src={"/" + imgContent} roundedCircle width={32} height={32} />
        </Col>
      </Row>
    </Container>
  );
}
export default App;

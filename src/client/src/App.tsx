/* eslint-disable */
import React, { lazy, Suspense, useEffect, useState } from "react";
import { wiseSaying, num } from "./wiseSaying";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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

import { userCookie, setGcookie } from "../src/redux/modules/user/userCookie";
import { setVideoId } from "./redux/modules/product/videoOwner";
import { setLoginStay } from "./redux/modules/user/confirmUser";
import { RootState } from "./redux/store";
import { getCookie } from "./cookie";
import "./scss/App.scss";
import "bootstrap/dist/css/bootstrap.css";

const Login = lazy(() => import("./routes/Login"));
const Watch = lazy(() => import("./routes/Watch"));
const SignUp = lazy(() => import("./routes/SignUp"));
const MyPage = lazy(() => import("./routes/MyPage"));
const Upload = lazy(() => import("./routes/Upload"));
const See = lazy(() => import("./routes/See"));
const Moive = lazy(() => import("./routes/Movie"));

function App() {
  const dispatch = useDispatch();
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

  console.log(videoIdBox);
  console.log(parseStoredData);
  console.log(fileUrlId);

  const userConfirm: string = getCookie("myToken");
  if (userConfirm !== undefined) {
    dispatch(setLoginStay(true));
  } else {
    dispatch(setLoginStay(false));
  }
  return (
    <div className="App">
      <NavScrollExample />

      <Suspense fallback={<BorderExample />}>
        <Routes>
          <Route
            path="/"
            element={
              <CarouselFadeExample
                movieTrailer="Trailer"
                movieInfo="MovieInfo"
              />
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          {login ? (
            <>
              <Route path="/user/myPage" element={<MyPage />} />
              <Route path="/user/logOut" />
              <Route
                path="/video"
                element={<Watch fileUrlId={fileUrlId} />}
              />{" "}
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

      <div className="say">
        <h5>{wiseSaying[num].content}</h5>
        <h6>-{wiseSaying[num].actor}-</h6>
      </div>
    </div>
  );
}

function BorderExample() {
  return <Spinner animation="border" />;
}

function NavScrollExample(): JSX.Element {
  const login = useSelector((state: RootState) => state.confirmUser.loginStay);

  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
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
                  navigate("/video");
                }}
              >
                Video
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
                  I'm User
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

function CarouselFadeExample(props: {
  movieTrailer: string;
  movieInfo: string;
}): JSX.Element {
  let navigate = useNavigate();
  return (
    <Carousel fade>
      <Carousel.Item className="poster">
        <img
          className="d-blockw-100"
          src="img/assets/Apes.png"
          onClick={() => {
            navigate("/video/movie");
          }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" alt={props.movieTrailer} />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" alt={props.movieInfo} />
      </Carousel.Item>
    </Carousel>
  );
}

function ShapeExample() {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src="holder.js/171x180" roundedCircle />
        </Col>
      </Row>
    </Container>
  );
}
export default App;

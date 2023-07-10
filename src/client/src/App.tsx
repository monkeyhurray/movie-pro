/* eslint-disable */
import { lazy, Suspense, useEffect } from "react";
import { wiseSaying, num } from "./wiseSaying";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Carousel,
  Spinner,
} from "react-bootstrap";
import "./scss/App.scss";
import {
  selectUserCookie,
  userCookie,
} from "../src/redux/modules/user/userCookie";
import { RootState } from "./redux/store";

const Movie = lazy(() => import("./routes/Movie"));
const Login = lazy(() => import("./routes/Login"));
const SignUp = lazy(() => import("./routes/SignUp"));
const Wirting = lazy(() => import("./routes/Wirting"));
const LatestMovie = lazy(() => import("./routes/LatestMovie"));
const MasterPiece = lazy(() => import("./routes/MasterPiece"));
const MyPage = lazy(() => import("./routes/MyPage"));
const Watch = lazy(() => import("./routes/Watch"));

export const VideoUpload = lazy(() => import("./routes/VideoUpload"));

function App() {
  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.confirmUser.loginStay);

  useEffect(() => {
    if (login) {
      userCookie(dispatch);
    }
  }, [dispatch, login]);

  const cookieValue = document.cookie;
  if (typeof cookieValue === "string" && cookieValue !== "") {
    localStorage.setItem("userCookie", cookieValue);
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
          <Route path="/movie" element={<Movie />} />
          <Route path="/latestMovie" element={<LatestMovie />} />
          <Route path="/masterPiece" element={<MasterPiece />} />

          <Route path="/wirting" element={<Wirting />} />
          <Route path="/watch/upload" element={<VideoUpload />} />
          {login ? (
            <>
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/watch" element={<Watch />} />{" "}
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
        <Navbar.Brand as={Link} to="/">
          MoviePro
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              onClick={(): void => {
                navigate("/");
              }}
              href="/"
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/movie");
              }}
            >
              Movie
            </Nav.Link>
            <NavDropdown title="MovieInfo" id="navbarScrollingDropdown">
              <NavDropdown.Item
                onClick={() => {
                  navigate("/latestMovie");
                }}
              >
                Latest Movie
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  navigate("/masterPiece");
                }}
              >
                Master Piece
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  navigate("/watch");
                }}
              >
                Watch
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <Nav>
            {login ? ( // logIn 상태에 따라 다른 내용 보여주기
              <Nav.Link
                className="LoggedInContent"
                onClick={() => {
                  navigate("/myPage");
                }}
              >
                I'm User
              </Nav.Link>
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
            navigate("/movie");
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

export default App;

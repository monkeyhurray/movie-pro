/* eslint-disable */
import React, { lazy, Suspense } from "react";
import { wiseSaying, num } from "./wiseSaying";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { signUpUser } from "./redux/modules/user/signUpUser";
import "bootstrap/dist/css/bootstrap.css";

import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Carousel,
  Spinner,
  Placeholder,
  Card,
} from "react-bootstrap";
import "./scss/App.scss";
import session from "express-session";

const Movie = lazy(() => import("./routes/Movie"));
const Login = lazy(() => import("./routes/Login"));
const SignUp = lazy(() => import("./routes/SignUp"));
const Community = lazy(() => import("./routes/Community"));
const Wirting = lazy(() => import("./routes/Wirting"));
const LatestMovie = lazy(() => import("./routes/LatestMovie"));
const MasterPiece = lazy(() => import("./routes/MasterPiece"));
const MyPage = lazy(() => import("./routes/MyPage"));

function App() {
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

          <Route path="/community" element={<Community />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/latestMovie" element={<LatestMovie />} />
          <Route path="/masterPiece" element={<MasterPiece />} />

          <Route path="/wirting" element={<Wirting />} />
          <Route path="/myPage" element={<MyPage />} />
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
              <NavDropdown.Item href="LatestMovie">
                Latest Movie
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/masterPiece">
                Master Piece
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/community">
                Community
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
            <Nav.Link
              onClick={() => {
                navigate("/login");
              }}
              className="LoginButton"
            >
              Login
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              onClick={() => {
                navigate("/signUp");
              }}
              className="SignUpButton"
            >
              SignUp
            </Nav.Link>
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
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt={props.movieTrailer}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt={props.movieInfo}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default App;

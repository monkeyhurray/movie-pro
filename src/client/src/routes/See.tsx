import { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { getCookie } from "../cookie";
import "../scss/See.scss";
import { setVideoId } from "../redux/modules/product/videoOwner";

import { userCookie } from "../../src/redux/modules/user/userCookie";
import { useParams } from "react-router-dom";
interface Movie {
  id: number;
  movie: string;
  genre: string;
  cast: string;
  fileNum: string;
  owner: string;
}

interface TableData {
  tableData: Movie[];
}

const See: React.FC = () => {
  localStorage.getItem("");
  return (
    <div>
      <CardExample />
    </div>
  );
};

const CardExample: React.FC = () => {
  const dispatch = useDispatch();
  const { videoId } = useSelector((state: RootState) => state.videoOwner);
  const { id } = useParams();
  useEffect(() => {
    userCookie(dispatch);
    const id = getCookie("videoId");
    dispatch(setVideoId(id));
  }, [dispatch]);
  const fileUrlId = videoId;

  console.log(fileUrlId);

  const storedDataString = localStorage.getItem("recoil-persist");
  let tableData: TableData | null = null;

  if (storedDataString !== null) {
    tableData = JSON.parse(storedDataString) as TableData;
  }

  if (tableData === null) {
    throw new Error("tableData is null");
  }
  const items = tableData.tableData;

  /* 
    items.map((item) => {
      const id = item.id;
      const movieTitle = item.movie;
      const genre = item.genre;
      const cast = item.cast;
      const fileNum = item.fileNum;
      // 이제 id, movieTitle, genre, cast 등의 값을 사용할 수 있습니다.
     });
  */

  /*
<Card.Img variant="top" src="img/assets/Apes.png" />
Card.Body태그 안에 작성되어 있던 것
 <source type="video/mp4" />
*/
  return (
    <div className="d-flex justify-content-around">
      <Card className="video-Card">
        <Card.Body className="video-Card-Body">
          <video
            className="video-Card-Body-content"
            src={"/" + items[0].fileNum}
            controls
          ></video>
        </Card.Body>
      </Card>

      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            <strong>Title:</strong>
            {items[0].movie}
            <br />
          </Card.Title>
          <Card.Text>
            <strong>Genre:</strong>
            {items[0].genre}
            <br />
            <strong>Owner:</strong>
            {items[0].owner}
            <br />
            <strong>Actors:</strong>
            {items[0].cast}

            <br />
          </Card.Text>
          <Example />
        </Card.Body>
      </Card>
    </div>
  );
};

const Example: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Introduce
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Introduce</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default See;

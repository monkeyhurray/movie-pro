import { useState, useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Modal } from "react-bootstrap";
import { RootState } from "../../src/redux/store";
import { useParams } from "react-router-dom";
import { Action } from "redux";
import "../scss/See.scss";
import {
  setIntroduce,
  videoControll,
} from "src/redux/modules/product/videoPlay";

interface PayLoad {
  type: string;
  payload: {};
}

interface VideoPayload {
  introduce: string;
}

interface TableData {
  tableData: Movie[];
}

interface Movie {
  id: number;
  movie: string;
  genre: string;
  cast: string;
  fileNum: string;
  owner: string;
  introduce: string;
}

function See() {
  return (
    <div>
      <CardExample />
    </div>
  );
}

function CardExample() {
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<
    RootState,
    Action<string>,
    Action<string>
  > = useDispatch();
  const { introduce } = useSelector((state: RootState) => state.videoPlay);

  const storedDataString = localStorage.getItem("recoil-persist");

  const tableData: TableData = storedDataString
    ? JSON.parse(storedDataString)
    : null;

  let parsedId: number;

  if (id !== undefined) {
    parsedId = parseInt(id) - 1;
  } else {
    parsedId = 0;
  }

  let items = tableData.tableData[parsedId];

  let toUseIntroduce = localStorage.getItem("videoIdBox") as string;
  let useIntroduce: string[] = JSON.parse(toUseIntroduce);
  let intr = useIntroduce[parsedId];

  useEffect(() => {
    const dispatFuc = async () => {
      const videoControllInfo = await dispatch(videoControll(intr));
      const videoInfo = videoControllInfo.payload as PayLoad;
      const realVideo = videoInfo.payload as VideoPayload;

      dispatch(setIntroduce(realVideo.introduce));
    };
    dispatFuc();
  }, [dispatch]);

  /*
Card.Body태그 안에 작성되어 있던 것
 <source type="video/mp4" />
*/
  return (
    <div className="d-flex justify-content-around">
      <Card className="video-Card">
        <Card.Body className="video-Card-Body">
          <video
            className="video-Card-Body-content"
            src={"/uploads\\videos\\" + items.fileNum}
            controls
          ></video>
        </Card.Body>
      </Card>

      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            <strong>Title:</strong>
            {items.movie}
            <br />
          </Card.Title>
          <Card.Text>
            <strong>Genre:</strong>
            {items.genre}
            <br />
            <strong>Owner:</strong>
            {items.owner}
            <br />
            <strong>Actors:</strong>
            {items.cast}
            <br />
          </Card.Text>
          <Example introduce={introduce} />
        </Card.Body>
      </Card>
    </div>
  );
}
interface ExampleProps {
  introduce: string;
}
const Example = ({ introduce }: ExampleProps) => {
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
        <Modal.Body>{introduce}</Modal.Body>
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

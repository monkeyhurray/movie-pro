import { useState, useEffect } from "react";
import "../scss/Movie.scss";
import { Card, Button, Modal } from "react-bootstrap";
import { RootState } from "../../src/redux/store";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { useSelector, useDispatch } from "react-redux";
import "../scss/See.scss";
import {
  setTitle,
  setOwner,
  setVideo,
  setGenre,
  setActors,
  setIntroduce,
  videoControll,
} from "src/redux/modules/product/videoPlay";

interface Owner {
  _id: string;
  id: string;
  email: string;
  name: string;
  socialOnly: boolean;
  userName: string;
  password: string;
  videos: [];
  __v: number;
}
interface VideoPayload {
  actors: string;
  genre: string;
  introduce: string;
  owner: Owner;
  title: string;
  videoUrl: string;
  __v: number;
  _id: string;
}
interface PayLoad {
  type: string;
  payload: {};
}
interface SeeProps {
  id: string;
}
interface ExampleProps {
  introduce: string;
}
const See: React.FC<SeeProps> = ({ id }) => {
  return (
    <div>
      <CardExample id={id} />
    </div>
  );
};

const CardExample: React.FC<SeeProps> = ({ id }) => {
  const dispatch: ThunkDispatch<
    RootState,
    Action<string>,
    Action<string>
  > = useDispatch();

  const { title, genre, owner, video, actors, introduce } = useSelector(
    (state: RootState) => state.videoPlay
  );

  useEffect(() => {
    const dispatFuc = async () => {
      const videoControllInfo = await dispatch(videoControll(id));
      const videoInfo = videoControllInfo.payload as PayLoad;
      console.log(videoInfo);
      const realVideo = videoInfo.payload as VideoPayload;
      console.log(realVideo);
      dispatch(setTitle(realVideo.title));
      dispatch(setOwner(realVideo.owner.userName));
      dispatch(setGenre(realVideo.genre));
      dispatch(setActors(realVideo.actors));
      dispatch(setVideo(realVideo.videoUrl));
      dispatch(setIntroduce(realVideo.introduce));
    };
    dispatFuc();
  }, [dispatch, id]);
  console.log(video);
  const videoContent = video.replace("src\\client\\public\\", "");

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
            src={"/" + videoContent}
            controls
          ></video>
        </Card.Body>
      </Card>

      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            <strong>Title:</strong>
            {title}
            <br />
          </Card.Title>
          <Card.Text>
            <strong>Genre:</strong> {genre}
            <br />
            <strong>Owner:</strong> {owner}
            <br />
            <strong>Actors:</strong>
            {actors}
            <br />
          </Card.Text>
          <Example introduce={introduce} />
        </Card.Body>
      </Card>
    </div>
  );
};

const Example: React.FC<ExampleProps> = ({ introduce }) => {
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

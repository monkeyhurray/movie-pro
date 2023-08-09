import { useState, useEffect } from "react";
import "../scss/Movie.scss";
import { Card, Button, Modal } from "react-bootstrap";
import { RootState } from "../../src/redux/store";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { useSelector, useDispatch } from "react-redux";

import {
  setTitle,
  setOwner,
  setVideo,
  setGenre,
  setActors,
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

  const { title, genre, owner, video, actors } = useSelector(
    (state: RootState) => state.videoPlay
  );
  useEffect(() => {
    const dispatFuc = async () => {
      const videoControllInfo = await dispatch(videoControll(id));
      const videoInfo = videoControllInfo.payload as PayLoad;
      const realVideo = videoInfo.payload as VideoPayload;
      dispatch(setTitle(realVideo.title));
      dispatch(setOwner(realVideo.owner.userName));
      dispatch(setGenre(realVideo.genre));
      dispatch(setActors(realVideo.actors));
      dispatch(setVideo(realVideo.videoUrl));
      console.log(realVideo.videoUrl);
    };
    dispatFuc();
  }, [dispatch, id]);

  console.log(video);
  /*
<Card.Img variant="top" src="img/assets/Apes.png" />
Card.Body태그 안에 작성되어 있던 것
*/
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <video controls>
            <source
              src="../../../../uploads/videos/14c05da4bd9e0bfd48631c219a08153e"
              type="video/mp4"
            />
          </video>
        </Card.Body>
      </Card>

      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <strong>Genre:</strong> {genre}
            <br />
            <strong>Owner:</strong> {owner}
            <br />
            <strong>Actors:</strong>
            {actors}
            <br />
          </Card.Text>
          <Example />
        </Card.Body>
      </Card>
    </div>
  );
};

function Example() {
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
        <Modal.Body>
          전 세계에 퍼진 치명적인 바이러스 ‘시미안 플루’로 인해 유인원들은
          나날이 진화하는 반면, 살아남은 인간들은 점차 지능을 잃고 퇴화해 간다.
          인간과 공존할 수 있다고 믿었던 진화한 유인원의 리더 시저(앤디
          서키스)는 유인원들을 몰살하려는 인간군 대령(우디 해럴슨)에 의해 가족과
          동료들을 무참히 잃고 분노한다. 진화한 유인원이 언젠가 인간을 지배하게
          될 지도 모른다는 두려움과 인류의 생존을 위해서 인간성마저도 버려야
          한다는 대령과 더 이상의 자비와 공존은 없다며 가족과, 자유와, 터전을
          위해 전쟁에 나서게 된 시저. 종의 운명과 지구의 미래를 결정할 피할 수
          없는 전쟁. 과연, 최후는 어떻게 될 것인가!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default See;

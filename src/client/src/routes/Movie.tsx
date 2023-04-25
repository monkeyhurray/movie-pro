/* eslint-disable */
import { useMemo, useRef, useState } from "react";
import "./Movie.css";
import { Card, Button, Placeholder, Modal } from "react-bootstrap";

function Movie(): JSX.Element {
  return (
    <div>
      <h4>Movie페이지</h4>
      <CardExample />
    </div>
  );
}

function CardExample() {
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "30rem" }}>
        <Card.Img variant="top" src="img/assets/Apes.png" />
        <Card.Body>
          <Card.Title>Planet of the Apes</Card.Title>
          <Card.Text className="hideText">
            <h4>내용</h4>
          </Card.Text>
          <Example />
        </Card.Body>
      </Card>

      <Card style={{ width: "30rem" }}>
        <div>
          <h3>출연진</h3>
        </div>
        <table>
          <tr>
            <td>
              <Card.Img
                className="actorImg"
                variant="top"
                src="img/assets/Andy.png"
              />
            </td>
            <td>Andy</td>
          </tr>
          <tr>
            <td>
              <Card.Img variant="top" src="holder.js/100px180" />
            </td>
          </tr>
        </table>
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>
    </div>
  );
}

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

export default Movie;

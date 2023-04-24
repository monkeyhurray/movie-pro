/* eslint-disable */
import { useMemo, useRef, useState } from "react";
import "./Movie.css";
import { Card, Button, Placeholder } from "react-bootstrap";

import content from "../content";

function Movie(): JSX.Element {
  return (
    <div>
      <h4>Movie페이지</h4>
      <CardExample />
    </div>
  );
}

function CardExample() {
  const [coco] = useState(content);

  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "30rem" }}>
        <Card.Img variant="top" src="img/assets/Apes.png" />
        <Card.Body>
          <Card.Title>Planet of the Apes</Card.Title>
          <Card.Text className="hideText">
            <h4>내용</h4>
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
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
export default Movie;

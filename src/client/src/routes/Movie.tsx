/* eslint-disable */
import "./Movie.css";
import { Card, Button, Placeholder } from "react-bootstrap";
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
            내용담기 귀찮으니 다음에 만들것
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: "30rem" }}>
        <table>
          <tr>
            <td>
              <Card.Img
                className="actorImg"
                variant="top"
                src="img/assets/Andy.png"
              />
            </td>
            <td>
              <h4>안녕</h4>
            </td>
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

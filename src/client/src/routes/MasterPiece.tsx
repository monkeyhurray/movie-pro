/* eslint-disable */
import { Table } from "react-bootstrap";
function MasterPiece(): JSX.Element {
  return (
    <div>
      <h4>명작 리스트</h4>
      <BasicExample />
    </div>
  );
}

function BasicExample(): JSX.Element {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Movie</th>
          <th>Genre</th>
          <th>Cast</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>혹성탈출</td>
          <td>SF, 액션</td>
          <td>앤디 서키스, 우디 해럴슨, 스티브 잔, 아미아 밀러</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default MasterPiece;

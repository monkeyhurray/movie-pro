import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../scss/Community.scss";

function Community() {
  return (
    <>
      <div className="communityTable">
        <ResponsiveExample />
        <OutlineTypesExample />
      </div>
    </>
  );
}

function ResponsiveExample() {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <td>제목</td>
          <td>작성자</td>
          <td>작성날짜</td>
          <td>조회수</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          {Array.from({ length: 4 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
      </tbody>
    </Table>
  );
}
function OutlineTypesExample() {
  let navigate = useNavigate();
  return (
    <Button
      variant="outline-primary"
      onClick={() => {
        navigate("/Wirting");
      }}
    >
      글쓰기
    </Button>
  );
}

export default Community;

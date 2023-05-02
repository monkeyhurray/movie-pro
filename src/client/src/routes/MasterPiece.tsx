/* eslint-disable */
import { Table } from "react-bootstrap";
import "../scss/MasterPiece.scss";
function MasterPiece(): JSX.Element {
  return (
    <div className="masterMovieFrame">
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
          <td>그 시절, 우리가 좋아했던 소녀</td>
          <td>멜로/로맨스, 드라마</td>
          <td>가진동, 천옌시, 오견, 만만, 언승우</td>
        </tr>
        <tr>
          <td>3</td>
          <td>실버라이닝 플레이북</td>
          <td>로맨틱 코미디</td>
          <td>브래들리 쿠퍼, 제니퍼 로렌스, 로버트 드 니로</td>
        </tr>
        <tr>
          <td>4</td>
          <td>플립</td>
          <td>맬로/로맨스, 드라마</td>
          <td>매들린 캐롤, 캘런 맥오리피, 존 마호니</td>
        </tr>
        <tr>
          <td>5</td>
          <td>그 여자 작사 그 남자 작곡</td>
          <td>맬로/로맨스</td>
          <td>드류 베리모어, 휴 그랜트, 브래드 거렛, 헤일리 베넷</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default MasterPiece;

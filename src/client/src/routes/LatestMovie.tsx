import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../scss/LatestMovie.scss";
function LatestMovie(): JSX.Element {
  return (
    <div className="latestMovieFrame">
      <BasicExample />
    </div>
  );
}

function BasicExample(): JSX.Element {
  const navigate = useNavigate();
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
        <tr
          onClick={() => {
            navigate("/video/:id");
          }}
        >
          <td>1</td>
          <td>존 윅4</td>
          <td>액션</td>
          <td>키아누 리브스, 견자단, 빌 스카스가드, 로렌스 피시번</td>
        </tr>
        <tr
          onClick={() => {
            navigate("/video/:id");
          }}
        >
          <td>2</td>
          <td>에어</td>
          <td>드라마</td>
          <td>멧 데이먼, 벤 애플렉, 제이슨 베이트먼, 말론 웨이언스</td>
        </tr>
        <tr
          onClick={() => {
            navigate("/video/:id");
          }}
        >
          <td>3</td>
          <td>리바운드</td>
          <td>드라마</td>
          <td>안재홍, 이신영, 정진운, 김택, 정건주, 김민</td>
        </tr>
        <tr
          onClick={() => {
            navigate("/video/:id");
          }}
        >
          <td>4</td>
          <td>오토라는 남자</td>
          <td>코미디</td>
          <td>톰 행크스, 마리아나 트레비노, 레이첼 켈러</td>
        </tr>
        <tr
          onClick={() => {
            navigate("/video/:id");
          }}
        >
          <td>5</td>
          <td>가디언즈 오브 갤럭시: Volume 3</td>
          <td>액션</td>
          <td>
            크리스 프랫, 조 샐다나, 데이브 바티스타, 빈 디젤, 브래들리 쿠퍼,
            카렌 길런
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default LatestMovie;

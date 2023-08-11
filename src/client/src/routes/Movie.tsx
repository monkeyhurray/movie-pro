import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import "../scss/MasterPiece.scss";
import { useState } from "react";
interface MovideProps {
  id: string;
}

const Movie: React.FC<MovideProps> = ({ id }) => {
  return (
    <div className="masterMovieFrame">
      <BasicExample id={id} />
    </div>
  );
};

const BasicExample: React.FC<MovideProps> = ({ id }) => {
  const navigate = useNavigate();
  const [tables, setTables] = useState<number[]>([]);

  const handleCreateTable = () => {
    setTables([...tables, tables.length + 1]);
  };

  const handleButtonClick = (e: React.FormEvent) => {
    e.preventDefault();

    handleCreateTable();
    navigate("/video/upload");
  };

  return (
    <>
      <div className="uploadBtn">
        <button onClick={handleButtonClick}>video upload</button>
      </div>
      <>
        <br />
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
            {tables.map((tableId) => (
              <div key={tableId}>
                <table>
                  {
                    <tr
                      onClick={() => {
                        navigate(`/video/${id}`);
                      }}
                    >
                      <td>1</td>
                      <td>혹성탈출</td>
                      <td>SF, 액션</td>
                      <td>앤디 서키스, 우디 해럴슨, 스티브 잔, 아미아 밀러</td>
                    </tr>
                  }
                </table>
              </div>
            ))}
          </tbody>
        </Table>
      </>
    </>
  );
};

export default Movie;

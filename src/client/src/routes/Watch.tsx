import "../scss/Watch.scss";
import { useNavigate } from "react-router-dom";
import { Figure } from "react-bootstrap";

interface WatchProps {
  fileUrlId: string;
}

const Watch: React.FC<WatchProps> = ({ fileUrlId }) => {
  return (
    <>
      <FigureExample fileUrlId={fileUrlId} />
    </>
  );
};

const FigureExample: React.FC<WatchProps> = ({ fileUrlId }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="uploadBtn">
        <button onClick={() => navigate("/video/upload")}>video upload</button>
      </div>

      <div className="uploadBtn">
        <button onClick={() => navigate("/video/delete")}>video delete</button>
      </div>

      <Figure
        className="figureFrame"
        onClick={() => navigate(`/video/movie/${fileUrlId}`)}
      >
        <Figure.Image width={171} height={180} alt="trailler img" />
        <Figure.Caption>asdasc.jasljd</Figure.Caption>
      </Figure>
    </>
  );
};

export default Watch;
/*
    multer를 사용해 원하는 이미지, 영상을 올린다. 
    FigureExample에는 이미지를 Movie컴포넌트에는 영상을 올린다.
    
*/

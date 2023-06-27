import "../scss/Watch.scss";
import { useNavigate } from "react-router-dom";
import { Figure } from "react-bootstrap";

function Watch() {
  return (
    <>
      <FigureExample />
    </>
  );
}

function FigureExample() {
  const navigate = useNavigate();
  return (
    <>
      <div className="uploadBtn">
        <button onClick={() => navigate("/watch/upload")}>video upload</button>
      </div>

      <Figure
        className="figureFrame"
        onClick={() => navigate("/watch/:id([0-9a-f]{24})")}
      >
        <Figure.Image width={171} height={180} alt="trailler img" />
        <Figure.Caption>
          Nulla vitae elit libero, a pharetra augue mollis interdum.
        </Figure.Caption>
      </Figure>
    </>
  );
}

export default Watch;
/*
    multer를 사용해 원하는 이미지, 영상을 올린다. 
    FigureExample에는 이미지를 Movie컴포넌트에는 영상을 올린다.
    
*/

import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../src/redux/store";
import axios from "axios";
import {
  setTitle,
  setThumb,
  setFileContent,
} from "../redux/modules/product/videoContent";
import "../scss/VideoUpload.scss";

function VideoUpload() {
  const { title, thumb, fileContent } = useSelector(
    (state: RootState) => state.videoContent
  );
  const onUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        title,
        thumb,
        fileContent,
      };
      axios
        .post("/watch/upload", dataToSubmit)
        .then(() => {})
        .catch((error) => {
          console.error("저장 실패", error);
        });
    } catch (error) {
      console.error("동영상이 업로드 되지 않습니다.", error);
    }
  };

  return (
    <form
      className="frame"
      name="signUpForm"
      method="post"
      encType="multipart/form-data"
      onSubmit={onUpload}
    >
      <div className="box">
        <FormFloatingBasicExample />
      </div>
      <SizesExample />
    </form>
  );
}

function FormFloatingBasicExample(): JSX.Element {
  const dispatch = useDispatch();
  const { title } = useSelector((state: RootState) => state.videoContent);

  const handleThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    dispatch(setThumb(file));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(setFileContent(file));
    }
  };

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <FloatingLabel
              controlId="floatingInput"
              label="Title"
              className="mb1"
            >
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setTitle(e.target.value))
                }
              />
            </FloatingLabel>
          </td>
        </tr>
        <tr>
          <td>
            <FloatingLabel
              controlId="floatingInput"
              label="Thumb Nail"
              className="mb1"
            >
              <Form.Control
                type="file"
                accept="image/*"
                placeholder="Thumb Nail"
                name="thumb"
                onChange={handleThumbChange}
              />
            </FloatingLabel>
          </td>
        </tr>
        <tr>
          <td>
            <FloatingLabel
              controlId="floatingInput"
              label="File"
              className="mb1"
            >
              <Form.Control
                type="file"
                placeholder="File"
                accept="video/*"
                name="video"
                onChange={handleFileChange}
              />
            </FloatingLabel>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function SizesExample(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div>
      <Button className="btn2" variant="primary" size="lg" type="submit">
        Content Upload
      </Button>

      <Button
        className="btn2"
        onClick={() => {
          navigate("/");
        }}
      >
        Close
      </Button>
    </div>
  );
}
//<label for="name에 적힌것"></lavel>
export default VideoUpload;

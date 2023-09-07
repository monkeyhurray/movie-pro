import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import {
  setActors,
  setGenre,
  setTitle,
  setVideoFile,
  setOwner,
  setIntroduce,
  videoUpload,
} from "../redux/modules/product/videoUpload";

import "../scss/Upload.scss";
import { Action } from "redux";
import { getCookie } from "../cookie";

interface BasicExampleProps {
  introduce: string;
}

function VideoUpload() {
  type VideoUploadDispatch = ThunkDispatch<RootState, File, Action<string>>;
  const dispatch: VideoUploadDispatch = useDispatch();
  const navigate = useNavigate();

  const { title, videoFile, genre, actors, introduce } = useSelector(
    (state: RootState) => state.videoUpload
  );

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myToken = getCookie("myToken");
    console.log(myToken);
    try {
      const userId = myToken.userId;
      dispatch(setOwner(userId));

      const formData = new FormData();
      if (videoFile !== null) {
        formData.append("videoFile", videoFile);
      }
      formData.append("title", title);
      formData.append("owner", userId);
      formData.append("genre", genre);
      formData.append("actors", actors);
      formData.append("introduce", introduce);

      await dispatch(videoUpload(formData));

      navigate("/");
    } catch (error) {
      console.error("동영상이 업로드 되지 않습니다.", error);
    }
  };

  return (
    <form
      className="frame"
      encType="multipart/form-data"
      name="signUpForm"
      method="post"
      onSubmit={handleUpload}
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
  const { title, genre, actors, introduce } = useSelector(
    (state: RootState) => state.videoUpload
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoFile = e.target.files?.[0];
    if (videoFile !== undefined) {
      dispatch(setVideoFile(videoFile));
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
              label="Genre"
              className="mb1"
            >
              <Form.Control
                type="text"
                placeholder="Genre"
                name="Genre"
                value={genre}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setGenre(e.target.value))
                }
              />
            </FloatingLabel>
          </td>
        </tr>

        <tr>
          <td>
            <FloatingLabel
              controlId="floatingInput"
              label="Actors"
              className="mb1"
            >
              <Form.Control
                type="text"
                placeholder="Actors"
                name="actors"
                value={actors}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setActors(e.target.value))
                }
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
                name="videoFile"
                required
                onChange={handleFileChange}
              />
            </FloatingLabel>
          </td>
        </tr>
        <tr>
          <td>
            <TextArea introduce={introduce} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

const TextArea: React.FC<BasicExampleProps> = ({ introduce }) => {
  const dispatch = useDispatch();
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    dispatch(setIntroduce(text));
  };

  return (
    <textarea
      className="introText"
      cols={40}
      rows={10}
      placeholder="Introduce"
      name="introduce"
      id="introduce"
      value={introduce}
      onChange={handleTextChange}
    />
  );
};

function SizesExample(): JSX.Element {
  const navigate = useNavigate();
  const movePage = () => {
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="button-container">
      <div className="uploadBtn">
        <Button className="btn1" variant="primary" size="lg" type="submit">
          Upload
        </Button>
      </div>
      <div className="closeBtn">
        <Button className="btn2" size="lg" onClick={movePage}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default VideoUpload;

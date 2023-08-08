import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import {
  setActors,
  setGenre,
  videoUpload,
} from "../redux/modules/product/videoUpload";
import {
  setTitle,
  setVideoFile,
  setOwner,
} from "../redux/modules/product/videoUpload";
import "../scss/VideoUpload.scss";
import { Action } from "redux";
import { getCookie } from "../cookie";

function VideoUpload() {
  type VideoUploadDispatch = ThunkDispatch<RootState, File, Action<string>>;
  const dispatch: VideoUploadDispatch = useDispatch();
  const navigate = useNavigate();
  const { title, videoFile, genre, actors } = useSelector(
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
  const { title, genre, actors } = useSelector(
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
              label="genre"
              className="mb1"
            >
              <Form.Control
                type="text"
                placeholder="Genre"
                name="genre"
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
//<label for="name에 적힌것"></label>
export default VideoUpload;

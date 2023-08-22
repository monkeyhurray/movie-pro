import React, { useEffect, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { useNavigate } from "react-router-dom";
import { useTable, Column } from "react-table";
import { RootState } from "../../src/redux/store";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { useSelector, useDispatch } from "react-redux";
import { Action } from "redux";
import "../scss/MasterPiece.scss";
import { setVideoId } from "../redux/modules/product/videoOwner";
import { getCookie } from "../cookie";
import { userCookie } from "../../src/redux/modules/user/userCookie";

import {
  setTitle,
  setOwner,
  setVideo,
  setGenre,
  setActors,
  setIntroduce,
  videoControll,
} from "src/redux/modules/product/videoPlay";

interface Owner {
  _id: string;
  id: string;
  email: string;
  name: string;
  socialOnly: boolean;
  userName: string;
  password: string;
  videos: [];
  __v: number;
}

interface VideoPayload {
  actors: string;
  genre: string;
  introduce: string;
  owner: Owner;
  title: string;
  videoUrl: string;
  __v: number;
  _id: string;
}
interface PayLoad {
  type: string;
  payload: {};
}
interface MovideProps {
  fileUrlId: string;
}

interface MovieData {
  id: number;
  movie: string;
  genre: string;
  cast: string;
  fileNum: string;
  owner: string;
}

const Movie: React.FC<MovideProps> = ({ fileUrlId }) => {
  return (
    <div className="masterMovieFrame">
      <BasicExample fileUrlId={fileUrlId} />
    </div>
  );
};

const BasicExample: React.FC<MovideProps> = ({ fileUrlId }) => {
  const navigate = useNavigate();
  const [videoIdArray, setVideoIdArray] = useState();

  const dispatch: ThunkDispatch<
    RootState,
    Action<string>,
    Action<string>
  > = useDispatch();
  const { videoId } = useSelector((state: RootState) => state.videoOwner);

  useEffect(() => {
    userCookie(dispatch);
    const id = getCookie("videoIdBox");
    dispatch(setVideoId(id));
  }, [dispatch]);
  //const fileUrlId = videoId;

  const { title, genre, owner, video, actors, introduce } = useSelector(
    (state: RootState) => state.videoPlay
  );

  useEffect(() => {
    const dispatFuc = async () => {
      const videoControllInfo = await dispatch(videoControll(fileUrlId));
      const videoInfo = videoControllInfo.payload as PayLoad;
      console.log(videoInfo);
      const realVideo = videoInfo.payload as VideoPayload;
      console.log(realVideo);
      dispatch(setTitle(realVideo.title));
      dispatch(setOwner(realVideo.owner.userName));
      dispatch(setGenre(realVideo.genre));
      dispatch(setActors(realVideo.actors));
      dispatch(setVideo(realVideo.videoUrl));
      dispatch(setIntroduce(realVideo.introduce));
    };
    dispatFuc();
  }, [dispatch, fileUrlId]);

  useEffect(() => {
    if (fileUrlId !== undefined) {
      handleAddRow();
    }
  }, [fileUrlId]);

  const videoContent = video.replace("src\\client\\public\\", "");

  const { persistAtom } = recoilPersist();

  const initialData: MovieData[] = React.useMemo(() => [], []);

  const mbtiState = atom<MovieData[]>({
    key: "tableData",
    default: initialData,
    effects_UNSTABLE: [persistAtom],
  });

  const columns: Column<MovieData>[] = React.useMemo(
    () => [
      { Header: "#", accessor: "id" },
      { Header: "Movie", accessor: "movie" },
      { Header: "Genre", accessor: "genre" },
      { Header: "Cast", accessor: "cast" },
      { Header: "FileNum", accessor: "fileNum" },
      { Header: "Owner", accessor: "owner" },
    ],
    []
  );
  const [tableData, setTableData] = useRecoilState(mbtiState);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<MovieData>({
      columns,
      data: tableData,
    });

  const handleAddRow = () => {
    const newRow: MovieData = {
      id: tableData.length + 1,
      movie: `${title}`,
      genre: `${genre}`,
      cast: `${actors}`,
      fileNum: `${videoContent}`,
      owner: `${owner}`,
    };
    if (
      newRow.movie.trim() === "" ||
      newRow.genre.trim() === "" ||
      newRow.cast.trim() === "" ||
      newRow.fileNum.trim() === "" ||
      newRow.owner.trim() === ""
    ) {
      return;
    }

    const isDuplicate = tableData.some((item) => {
      return (
        item.movie === newRow.movie &&
        item.genre === newRow.genre &&
        item.cast === newRow.cast &&
        item.fileNum === newRow.fileNum &&
        item.owner === newRow.owner
      );
    });

    if (!isDuplicate) {
      setTableData((prevData) => [...prevData, newRow]);
    }
  };
  const handleRemoveRow = (id: number) => {
    const newData = tableData.filter((item) => item.id !== id);
    setTableData(newData);
  };

  const handleButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/video/upload");
  };

  return (
    <>
      <div className="uploadBtn">
        <button onClick={handleAddRow}>Add Table</button>
        {"   "}
        <button onClick={handleButtonClick}>video upload</button>
      </div>
      <br />
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { id } = row.original;

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    onClick={() => navigate(`/video/movie/${fileUrlId}`)}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
                <td>
                  <button onClick={() => handleRemoveRow(id)}>Remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Movie;

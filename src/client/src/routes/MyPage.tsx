import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOut } from "../redux/modules/user/confirmUser";
import Cookies from "js-cookie";

function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    logOut(dispatch);

    localStorage.removeItem("persist:root");
  };

  return (
    <>
      <h4>Your Profile</h4>
      <button
        onClick={() => {
          handleLogoutClick();
          navigate("/");
        }}
      >
        LogOut
      </button>
    </>
  );
}
export default MyPage;

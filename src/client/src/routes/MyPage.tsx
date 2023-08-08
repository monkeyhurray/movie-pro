import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/modules/user/confirmUser";
import { persistor } from "../index";
import { removeCookie } from "../cookie";
function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const purge = async () => {
    await persistor.purge();
  };

  const handleLogoutClick = async () => {
    logOut(dispatch);
    localStorage.removeItem("persist:root");
    await purge();
    removeCookie("myToken");
    navigate("/");
  };

  return (
    <>
      <h4>Your Profile</h4>
      <button
        onClick={() => {
          handleLogoutClick();
        }}
      >
        LogOut
      </button>
    </>
  );
}
export default MyPage;

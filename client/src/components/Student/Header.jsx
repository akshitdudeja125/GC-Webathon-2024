import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../Images/logo.png";

const Header = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  const logout = () => {
    // dispatch({ type: "LOGOUT" });
    // navigate("/login/studentlogin");
    console.log("Logging out");
};
const username="Chaitanya Bhardwaj";
  return (
    <div className="flex-[0.05] flex justify-between items-center mx-10 my-6">
      <div className="flex items-center ">
        <img
          src={logo}
          alt=""
          className="h-12 mr-5"

        />
        <h1 className="font-bold text-blue-600 text-3xl">Indian Institute of Technology Bhubaneswar</h1>
      </div>
      {/* <h1 className="font-bold text-black text-2xl">Welcome</h1> */}
      <div className="flex items-center space-x-3 text-3xl font-semibold">
        {/* <Avatar
          src={user.result.avatar}
          alt={user.result.name.charAt(0)}
          sx={{ width: 24, height: 24 }}
          className="border-blue-600 border-2"
        /> */}
        <h1>{username}</h1>
        <LogoutIcon
          onClick={logout}
          className="cursor-pointer hover:scale-125 transition-all"
        />
      </div>
    </div>
  );
};

export default Header;

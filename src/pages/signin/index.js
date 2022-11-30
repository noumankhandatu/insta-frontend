import React from "react";
import logo from "../../assets/image/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { tokenAction } from "../../redux/tokenSlice";
import "./style.css";
import baseUrl from "../../baseUrl";
function SignIn() {
  const dispatch = useDispatch();
  const [getVal, setVal] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVal({ ...getVal, [name]: value });
  };

  const handleSubmit = async () => {
    // const response = await axios.post(`${baseUrl}/signin`, getVal);
    const response = await baseUrl.post("/signin", getVal);
    if (response) {
      toast(response.data);
      const jwtToken = response.data.token;
      const setUser = response.data.user;
      if (jwtToken && jwtToken !== undefined && jwtToken !== null) {
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("setUser", JSON.stringify(setUser));
        dispatch(tokenAction(jwtToken));
        alert("Hurray my khatun~ay awal made it");
      }
    }
  };

  return (
    <div className="signIn">
      <div>
        <div className="loginForm mtb">
          <img className="signUpLogo" src={logo} alt="" />
          <div className="mtb">
            <input
              type="email"
              onChange={(e) => handleChange(e)}
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="mtb">
            <input
              type="password"
              onChange={(e) => handleChange(e)}
              name="password"
              placeholder="Password"
            />
          </div>
          <input
            type="submit"
            id="login-btn"
            onClick={handleSubmit}
            value="Sign In"
          />
        </div>
        <div className="loginForm2 mtb">
          Don't have an account ?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

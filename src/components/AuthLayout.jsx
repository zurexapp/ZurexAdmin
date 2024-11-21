// components
// import Logo from "../components/Logo";
//import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
//import { toast } from "react-toastify";
import Spring from "../components/Spring";
import PasswordInput from "../components/PasswordInput";

// hooks
// import { useForm, Controller } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";

// utils
import classNames from "classnames";

// assets
import media from "../assets/login.webp";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
// import google from "@assets/icons/google.png";
// import facebook from "@assets/icons/facebook.png";

const AuthLayout = () => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const [formData, setformData] = useState({ email: "", password: "" });

  // useEffect(() => {
  //   if (isAuth === "Authenticated") {
  //     navigate("/home");
  //   }
  // }, [isAuth]);

  const handleFormSubit = async (e) => {
    e.preventDefault();
    if (formData.password?.length > 5) {
      if (
        formData.email.toLowerCase() === "aczurex_admin@gmail.com" &&
        formData.password === "aczurex1234"
      ) {
        dispatch(setAuth({ isAuth: "Authenticated" }));
        await window.localStorage.setItem(
          "aczurex_admin_login",
          "Authenticated"
        );
      } else {
        toast.error("Please use right email and password");
      }
    } else {
      toast.error("Password should be atleast 5 letters");
    }
  };

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)]">
      {width >= 1024 && (
        <div className="flex flex-col justify-center items-center lg:p-[60px]">
          <img
            src={require("../assets/logo.png")}
            style={{ width: "150px" }}
            alt="acZurex"
          />
          {/* <p className="text-center tracking-[0.2px] font-semibold text-lg leading-6 max-w-[540px] my-7 mx-auto">
            Gain data-based insights, view progress at a glance, and manage your
            organization smarter
          </p> */}
          <img className="max-w-[780px] mt-[30px]" src={media} alt="media" />
        </div>
      )}
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="max-w-[460px] w-full"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <div className="flex flex-col gap-2.5 text-center">
            <h1>Welcome back!</h1>
            {/* <p className="lg:max-w-[300px] m-auto 4xl:max-w-[unset]">
              Etiam quis quam urna. Aliquam odio erat, accumsan eu nulla in
            </p> */}
          </div>
          <form className="mt-5" onSubmit={handleFormSubit}>
            <div className="flex flex-col gap-5">
              <div className="field-wrapper">
                <label htmlFor="email" className="field-label">
                  E-mail
                </label>
                <input
                  required
                  minLength={10}
                  className={classNames("field-input")}
                  id="email"
                  type="text"
                  placeholder="Your E-mail address"
                  value={formData.email}
                  onChange={(e) =>
                    setformData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <PasswordInput
                placeholder="Your password"
                value={formData.password}
                onChange={(e) =>
                  setformData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col items-center gap-6 mt-4 mb-10">
              {/* <button className="text-btn" onClick={handlePasswordReminder}>
                Forgot Password?
              </button> */}
              <button type="submit" className="btn btn--primary w-full mt-4">
                Log In
              </button>
            </div>
          </form>
          {/* <div>
            <div className="relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-border" />
              <span className="flex items-center justify-center relative z-10 w-11 h-[23px] m-auto bg-widget">
                or
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 2xs:grid-cols-2 xs:gap-[30px] mt-[30px] mb-9">
              <LoginSocialGoogle
                className="btn btn--social"
                client_id={import.meta.env.VITE_GOOGLE_APP_ID}
                onReject={onReject}
                onResolve={onSubmit}
              >
                <img className="icon" src={google} alt="Google" />
                Google
              </LoginSocialGoogle>
              <LoginSocialFacebook
                className="btn btn--social"
                appId={import.meta.env.VITE_FB_APP_ID}
                onReject={onReject}
                onResolve={onSubmit}
              >
                <img className="icon" src={facebook} alt="Facebook" />
                Facebook
              </LoginSocialFacebook>
            </div> 
             <div className="flex justify-center gap-2.5 mt-[30px] leading-none">
              <p>Don’t have an account?</p>
              <button className="text-btn">Sign Up</button>
            </div> 
          </div> */}
        </Spring>
      </div>
    </div>
  );
};

export default AuthLayout;

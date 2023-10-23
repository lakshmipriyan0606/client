import React, { useState } from "react";
import loginImg from "../../img/login.png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [checkEmail, setCheckEmail] = useState("");
  const [checkPass, setCheckPass] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  function validateEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!email.match(emailRegex)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  }

  function validatePassword(password) {
    if (password.length < 8) {
      setPassError("Enter Your Correct Password");
    } else {
      setPassError("");
    }
  }

  function handleEmail(e) {
    const value = e.target.value;
    setCheckEmail(value);
    validateEmail(value);
  }
  function handlePass(e) {
    const value = e.target.value;
    setCheckPass(value);
    validatePassword(value);
  }
  // console.log(checkEmail , checkPass);

  function handleLogin(e) {
    setCheckPass("");
    setCheckEmail("");

    e.preventDefault();
    var check = true;
    if (checkEmail === "") {
      check = false;
      setEmailError("Fill This Field");
    }
    if (checkPass === "") {
      setPassError("Fill This Field");
      check = false;
    }

    if (check) {
      fetch(
        `https://server-zeta-smoky-29.vercel.app/?email=${checkEmail}&password=${checkPass}`
      )
        .then(
          function (success) {
            console.log(success);
            return success.json();
          },
          function (fail) {
            console.log(fail);
          }
        )
        .then(function (data) {
          if (data.message === "Succsfully") {
            navigate("/profile/"+data.Email);
          } else {
            alert("Wrong user and password");
          }
        });
    }
  }

  return (
    <section className="py-5 p-3">
      <div className="md:w-[500px] mx-auto   shadow rounded-xl shadow-gray-300   bg-[#16435A] text-gray-200">
      <h1 className="text-center p-5 font-medium  text-gray-200 text-4xl">
        Log<span className="text-green-500">in</span>
      </h1>
      <div className=" p-4 flex">
        <img
          src={loginImg}
          alt="login-img"
          className="w-[300px] h-[300px] object-cover p-5 mx-auto"
        />
      </div>
      <div className="p-4 grid grid-cols-1 gap-3 ">
        <div className="flex flex-col gap-2">
          <label className=" text-gray-200  text-lg">Email</label>
          <input
            type="text"
            onChange={handleEmail}
            value={checkEmail}
            className={
              emailError
                ? "border border-red-700 text-lg p-1 rounded-md  text-gray-800  outline-none"
                : "border-[1px] text-lg p-1 rounded-md border-gray-300 text-gray-800  outline-none"
            }
            placeholder="Enter Email"
          />
        </div>
        {emailError && (
          <span className="text-red-600 font-bold text-lg">{emailError}</span>
        )}
        <div className="flex flex-col gap-2">
          <label className=" text-gray-200  text-lg">Password</label>
          <input
            type="password"
            onChange={handlePass}
            value={checkPass}
            className={
              passError
                ? "border border-red-600 text-lg p-1 rounded-md  text-gray-800  outline-none"
                : "border-[1px] text-lg p-1 rounded-md border-gray-300 text-gray-800  outline-none"
            }
            placeholder="Enter Password"
          />
        </div>
        {passError && (
          <span className="text-red-600 font-bold text-lg">{passError}</span>
        )}
        <div className="flex my-5">
          <Link
            className="bg-green-500 hover:shadow-lg hover:shadow-green-700 text-center text-white p-1 text-lg rounded-lg  w-full  mx-auto hover:bg-green-400 transition-all duration-300  "
            onClick={handleLogin}>
            Login
            </Link>
         
        </div>
        <div className="flex justify-center items-center text-lg">
          Don't have an account? <Link to={"/"} className="ml-3 text-xl text-sky-500">Register</Link>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Login;

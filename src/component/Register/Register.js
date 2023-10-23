import React, { useState } from "react";
import signupImg from "../../img/signup.png";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conPass, setConPass] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [conPassError, setConPassError] = useState("");

  function validateName(name) {
    if (name.trim() === "") {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  }

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
      setPassError("Password must be at least 8 characters long");
    } else {
      setPassError("");
    }
  }

  function validateConfirmPassword(confirmPassword) {
    if (confirmPassword !== pass) {
      setConPassError("Password do not match");
    } else {
      setConPassError("");
    }
  }

  function handleName(e) {
    const value = e.target.value;
    setName(value);
    validateName(value);
  }
  function handleEmail(e) {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  }
  function handlePass(e) {
    const value = e.target.value;
    setPass(value);
    validatePassword(value);
  }
  function handleConPass(e) {
    const value = e.target.value;
    setConPass(value);
    validateConfirmPassword(value);
  }

  async function handleSign(e) {
    e.preventDefault();
    setName("");
    setEmail("");
    setPass("");
    setConPass("");

    let check = true;

    if (name === "") {
      setNameError("Fill this Field");
      check = false;
    }
    if (email === "") {
      setEmailError("Fill this Field");
      check = false;
    }
    if (pass === "") {
      setPassError("Fill this Field");
      check = false;
    }
    if (conPass === "") {
      setConPass("Fill this Field");
      check = false;
    }
    if (check) {
      try {
        fetch("https://server-zeta-smoky-29.vercel.app/register", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            pass: pass,
            conPass: conPass,
          }),
        })
          .then(
            function (success) {
              return success.json();
            },
            function (failiure) {
              console.log("failiure");
            }
          )
          .then(function (data) {
            console.log(data);
            if (data.message === "AlreadyRegistered") {
              alert("This Mail AlreadyRegistered");
              return false;
            } else {
              navigate("/login");
            }
          });
      } catch {
        alert("Did Not saved");
      }
    }
  }

  //   console.log(name, email, pass, conPass);

  return (
    <section className=" flex h-[900px] lg:h-[810px] py-4 " >
      <div className="flex  flex-col md:w-[500px] mx-auto shadow rounded-xl shadow-gray-300 py-2 bg-[#16435A] ">
        <h1 className="text-center p-5 font-medium  text-gray-200 text-4xl">
          Regi<span className="text-green-500">ster</span>
        </h1>
        <div className="">
          <div className="flex justify-center ">
            <img
              src={signupImg}
              alt="login-img"
              className="w-[300px] h-[300px] object-cover p-5"
            />
          </div>
        </div>
        <form>
          <div className="p-5 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-9 md:w-[500px]  ">
            <div className="flex flex-col gap-2">
              <label className=" text-gray-200  text-lg">Name</label>
              <input
                type="text"
                value={name}
                onChange={handleName}
                className={
                  nameError
                    ? "border border-red-700 text-lg p-1 rounded-md  text-gray-500  outline-none"
                    : "border-[1px] text-lg p-1 rounded-md border-gray-300 text-gray-500  outline-none"
                }
                placeholder="Enter Name"
                required
              />
              {nameError && (
                <span className="text-red-600 font-bold text-lg">
                  {nameError}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className=" text-gray-200  text-lg">Email</label>
              <input
                type="text"
                value={email}
                onChange={handleEmail}
                className={
                  nameError
                    ? "border border-red-700 text-lg p-1 rounded-md  text-gray-500  outline-none"
                    : "border-[1px] text-lg p-1 rounded-md border-gray-300 text-gray-500  outline-none"
                }
                placeholder="Enter Email"
              />
              {emailError && (
                <span className="text-red-600 font-bold text-lg">
                  {emailError}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className=" text-gray-200  text-lg">Password</label>
              <input
                type="password"
                value={pass}
                onChange={handlePass}
                className={
                  nameError
                    ? "border border-red-700 text-lg p-1 rounded-md  text-gray-500  outline-none"
                    : "border-[1px] text-lg p-1 rounded-md border-gray-300 text-gray-500  outline-none"
                }
                placeholder="Enter Password"
              />
              {passError && (
                <span className="text-red-600 font-bold text-lg">
                  {passError}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className=" text-gray-200  text-lg">
                Confirm Password
              </label>
              <input
                type="password"
                value={conPass}
                onChange={handleConPass}
                className={
                  nameError
                    ? "border border-red-700 text-lg p-1 rounded-md  text-gray-500  outline-none"
                    : "border-[1px] text-lg p-1 rounded-md border-gray-300 text-gray-500  outline-none"
                }
                placeholder="Enter Confirm Password"
              />
              {conPassError && (
                <span className="text-red-600 font-bold text-lg">
                  {conPassError}
                </span>
              )}
            </div>
          </div>
          <div className="flex my-2 mx-auto  justify-center items-center w-[75%] lg:w-[50%]">
            <Link
              to="/login"
              className="bg-green-500 text-center text-white p-1 text-lg rounded-lg  w-full mx-auto hover:bg-green-400 transition-all duration-300"
              onClick={handleSign}
            >
              Sign up
            </Link>
          </div>
          <div className="flex justify-center items-center text-lg py-2 text-gray-200">
            Already have an account?{" "}
            <Link to={"/login"} className="ml-3 text-xl text-sky-500">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;

import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import profileImg from "../../img/profileimg.jpg";
import { HiPencilSquare } from "react-icons/hi2";
import {BiLogOut} from "react-icons/bi";


const Profile = () => {
  var navigate = useNavigate()
  function logOut(){
    navigate('/login')
  
  }
  var { mail } = useParams();
  var [userName, setUserName] = useState("UserName");
  fetch(`https://server-zeta-smoky-29.vercel.app/userget?email=${mail}`)
    .then(
      (succes) => {
        return succes.json();
      },
      (fail) => {
        console.log(fail);
      }
    )
    .then((data) => {
      setUserName(data.user);
    });

  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("");

  const [age, setAge] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [dobError, setDobError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [mobileError, setMobileError] = useState("");

  function handleGender(e) {
    setGender(e.target.value);
  }
  function handleDob(e) {
    console.log(e.target.value);
    setDob(e.target.value);
  }
  function handleAge(e) {
    setAge(e.target.value);
  }
  function handleMobile(e) {
    setMobileNumber(e.target.value);
  }

  async function handleUpate() {
    let check = true;

    setGender("")
    setDob("")
    setAge("")
    setMobileNumber("")

    if (dob === "") {
      setDobError("Please enter date of birth");
      check = false;
    }

    if (age === "") {
      setAgeError("Fill this Field");
      check = false;
    }
    if (mobileNumber === "") {
      setMobileError("Fill this Field");
      check = false;
    }
    if (check) {
      try {
        fetch("https://server-zeta-smoky-29.vercel.app/profile", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gender: gender,
            dob: dob,
            age: age,
            mobileNumber: mobileNumber,
            email: mail,
          }),
        })
          .then(
            function (success) {
              return success.json()
            },
            function (failiure) {
              console.log("failure");
            }
          )
          .then(function (data) {
            console.log(data);
          });
      } catch {
        alert("Did Not saved");
      }
    }
    if(check){
      alert("Successfully Updated your Details on MongoDB")
    }
  }

  
  return (
    <div className="md:w-[500px]  mx-auto  shadow-md rounded-xl shadow-gray-300 py-2 bg-[#16435A] text-gray-200">
      <h1 className="text-center p-3 font-medium  text-gray-200 text-4xl">
        Pro<span className="text-green-500">file</span>
        <BiLogOut className="float-right text-3xl text-green-400 p-1 mt-2 rounded-lg cursor-pointer" onClick={logOut} />
      </h1>
    
      <div>
        <img
          src={profileImg}
          className="w-[250px] h-[250px] mx-auto "
          alt="profile-img"
        />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center p-9">
        <h1 className="text-3xl font-medium text-gray-200"> Hi ,  <span className="text-green-500">{userName} </span> 👋  </h1>
       
        <h1 className="flex gap-2 items-center justify-center ">
          Update Your Profile <HiPencilSquare />
        </h1>
      </div>
      <div className="grid grid-cols-1 p-2 gap-4">
        <div className="flex flex-col gap-3 ">
          <label>Gender : </label>
          <select
            className="border-[1px] text-lg p-1 rounded-md border-gray-300 text-gray-500  outline-none"
            onChange={handleGender}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
        </div>
        <div className="flex flex-col gap-3 ">
          <label>DOB :</label>
          <input
            type="date"
            onChange={handleDob}
            value={dob}
            placeholder="Enter your Date of Birth"
            className={
              dobError
                ? "border border-red-700 text-lg p-1 rounded-md  text-gray-500  outline-none"
                : "border-[1px] text-lg p-1 rounded-md border-gray-300 text-gray-500  outline-none"
            }
          />
          {dobError && (
            <span className="text-red-500 font-bold text-lg">{dobError}</span>
          )}
        </div>
        <div className="flex flex-col gap-3 ">
          <label>Age :</label>
          <input
            type="number"
            onChange={handleAge}
            value={age}
            placeholder="Enter Age"
            className={
              ageError
                ? "border border-red-700 text-lg p-1 rounded-md  text-gray-500  outline-none"
                : "border-[1px] text-lg p-1 rounded-md border-gray-300 text-gray-500  outline-none"
            }
          />
          {ageError && (
            <span className="text-red-500 font-bold text-lg">{ageError}</span>
          )}
        </div>
        <div className="flex flex-col gap-3 ">
          <label>Mobile no :</label>
          <input
            type="number"
            value={mobileNumber}
            placeholder="Enter Mobile no"
            className={
              ageError
                ? "border border-red-700 text-lg p-1 rounded-md  text-gray-500  outline-none"
                : "border-[1px] text-lg p-1 rounded-md border-gray-300 text-gray-500  outline-none"
            }
            onChange={handleMobile}
          />
          {mobileError && (
            <span className="text-red-500 font-bold text-lg">
              {mobileError}
            </span>
          )}
        </div>
        <div className="flex my-5">
          <button
            className="bg-green-500 hover:shadow-lg hover:shadow-green-700 text-center text-white p-1 text-lg rounded-lg  w-full  mx-auto hover:bg-green-400 transition-all duration-300  "
            onClick={handleUpate}
          >
            Update
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Profile;

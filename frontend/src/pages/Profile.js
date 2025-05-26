import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import Fotter from "../components/Fotter";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const Profile = () => {
  const [userDetails, setuserDetails] = useState(null);
  const [notes, setNotes] = useState(null);
  const [importantNotes, setImportantNotes] = useState(null);
  const [normalNotes, setNormalNotes] = useState(null);

  const navigate = useNavigate();

  function getUserDetails() {
    fetch(`${API_BASE_URL}/getUserDetails`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Applicatiosn-Type": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: localStorage.getItem("userID") }),
    })
      .then((res) => res.json())
      .then((data) => {
        setuserDetails(data);
      });
  }

  function getNotes() {
    fetch(`${API_BASE_URL}/getNotes`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: localStorage.getItem("userID") }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("getNotes API response:", data);

        // ✅ Check if request was successful and notes are present
        if (data.success && Array.isArray(data.notes)) {
          setNotes(data.notes);
          setImportantNotes(data.notes.filter((note) => note.isImportant));
          setNormalNotes(
            data.notes.filter((note) => note.isImportant === false)
          );
        } else {
          // ✅ Gracefully handle empty or failed response
          setNotes([]);
          setImportantNotes([]);
          setNormalNotes([]);
          console.warn("No notes found or API call failed");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch notes:", err);
      });
  }

  useEffect(() => {
    getUserDetails();
    getNotes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between w-screen h-[300px] px-[50px]">
        <div className="flex items-center gap-[10px]">
          <div className="profileCircle w-[150px] h-[150px] rounded-[50%] bg-[#d9d9d9]"></div>
          <div>
            <h3 className="text-[23px]">
              {userDetails ? userDetails.name : ""}
            </h3>
            <p className="m-[0px] p-[0px] text-[gray] text-[15px] -mt-1">
              Joined In{" "}
              {userDetails ? new Date(userDetails.date).toDateString() : ""}
            </p>
          </div>
        </div>

        <div className="relative h-[40%]">
          <div className="flex items-center gap-[10px] text-[gray]">
            Total Notes : {notes ? notes.length : ""} | Important Notes :{" "}
            {importantNotes ? importantNotes.length : ""}
          </div>
          <div className="absolute bottom-0 flex items-center gap-[10px]">
            <button className="btnNormal">Add Pic</button>
            <button
              className="btnNormal"
              onClick={() => {
                navigate("/addNewNote");
              }}
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
      <div className="w-screen px-[50px]">
        <h3 className="text-[26px]">
          Your <span style={{ color: "#578df5" }}>Important</span> Notes
        </h3>
      </div>
      <div className="gridItems">
        {importantNotes
          ? importantNotes.map((note, index) => {
              return <Note key={note._id} note={note} index={index} />;
            })
          : ""}
      </div>

      <div className="w-screen px-[50px] mt-4">
        <h3 className="text-[26px]">
          Your <span style={{ color: "#578df5" }}>Normal</span> Notes
        </h3>
      </div>
      <div className="gridItems mb-3">
        {normalNotes
          ? normalNotes.map((note, index) => {
              return <Note key={note._id} note={note} index={index} />;
            })
          : ""}
      </div>

      <Fotter />
    </>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import axios from "axios";
import DisplayData from "./DisplayData";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../../firebase";

const Body = () => {
  const [events, setEvents] = useState([]);
  const [feedbacks, setFeedbacks] = useState({}); // State to store feedback for each event
  const auth = getAuth(firebaseApp);
  const email = auth?.currentUser?.email;

  useEffect(() => {
    // Fetch event data from the API
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/admin/getEvents");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Initialize feedbacks state based on events data
    const initialFeedbacks = {};
    events.forEach((event) => {
      initialFeedbacks[event._id] = "";
    });
    setFeedbacks(initialFeedbacks);
  }, [events]);

  const handleFeedbackChange = (eventId, feedback) => {
    // Update feedbacks state when feedback input changes
    setFeedbacks((prevFeedbacks) => ({
      ...prevFeedbacks,
      [eventId]: feedback,
    }));
  };

  const handleSubmitFeedback = async () => {
    // Submit feedback to the API
    try {
      await Promise.all(
        events.map(async (event) => {
          const response = await axios.post("http://localhost:3002/api/event/registerEventFeedback", {
            email: email,
            feedback: feedbacks[event._id],
            eventId: event._id,
          });
          console.log("Feedback submitted for event:", response.data);
        })
      );
      // Optionally, you can set state or dispatch actions if needed
      console.log("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="flex-[0.8] mt-3 ml-10 mr-10">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-1">
          <MenuBookIcon />
          <h1>All Events</h1>
        </div>
        <div className="mr-2 bg-white rounded-xl pt-6 pl-3 h-[30rem]">
          <div className="col-span-3 mr-2">
            <div className={classes.adminData}>
              <div className="grid grid-cols-7">
                <h1 className={`${classes.adminDataHeading} col-span-1`}>Sr no.</h1>
                <h1 className={`${classes.adminDataHeading} col-span-2`}>Event</h1>
                <h1 className={`${classes.adminDataHeading} col-span-3`}>User Email</h1>
                <h1 className={`${classes.adminDataHeading} col-span-1`}>Feedback</h1>
              </div>
              {events.map((event, idx) => (
                <DisplayData
                  key={idx}
                  event={event}
                  onFeedbackChange={handleFeedbackChange} // Pass feedback change handler to DisplayData component
                />
              ))}
            </div>
            <button
              onClick={handleSubmitFeedback}
              className={`${classes.adminFormSubmitButton} w-48 mt-4`}
              type="button"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;

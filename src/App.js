import React, { useState, useContext, useEffect } from "react";
import "./App.css";
//import { Calendar } from "@material-ui/pickers";
//import { MuiPickersUtilsProvider } from "@material-ui/pickers";
//import DateFnsUtils from "@date-io/date-fns";
import styled from "@emotion/styled";
import MonthCalendar from "./components/MonthCalendar";
import { Button } from "react-bootstrap";
import NewEventPopUp from "./components/NewEventPopUp";
import CurrentEventPopUp from "./components/CurrentEventPopUp";
import { EventContexts } from "./components/EventContexts";
import { LoginContext } from "./components/LoginContext";
import LoginPopUp from "./components/LoginPopUp";
import LogoutPopUp from "./components/LogoutPopUp";
import axios from "axios";


// I love emotion!
const Title = styled.h1`
  color: #e4e4e4;
`;

const ButtonWrap = styled.div`
  & .login {
    position: relative;
    background: lightgreen;
    color: black;
    margin-bottom: 10px;
  }
`;

function App() {
  const { isNewEventPopUpOpen, isEventPopUpOpen, setEventsData } = useContext(EventContexts);
  //it looks like isLoginPopUpOpen is never used in this component
  const { isLoginPopUpOpen, openLoginPopUp, openLogoutPopUp, getEmail, email, isLogoutPopUpOpen } = useContext(LoginContext);
  const [ isLoaded, setIsLoaded] = useState(false);


  //since you are checking for the existence of email in multiple places, I would recommend making is a constant to use
  const isEmailSet = (email !== "");

  
  useEffect(() => {   
    if(!isLoaded){
      axios.get(`/getEvents.php`)
        .then(res => {
          setEventsData(res.data);
          setIsLoaded(true);
          getEmail();
        });
    }
  })

  return (
    <div className="App">
      <Title>Paycom Project Planner</Title>
      <ButtonWrap>
        <Button onClick={!isEmailSet ? openLoginPopUp : openLogoutPopUp} className="login" variant="success">
          {isEmailSet ? "Logged in as: " + email : "Log In" }
        </Button>
        
      </ButtonWrap>
      
      <MonthCalendar />
      <div>{!isEmailSet ? <LoginPopUp /> : null}</div>
      <div>{isLogoutPopUpOpen ? <LogoutPopUp /> : null}</div>
      <div>{isNewEventPopUpOpen ? <NewEventPopUp /> : null}</div>
      <div>{isEventPopUpOpen ? <CurrentEventPopUp /> : null}</div>
    </div>
  );
}

export default App;

import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { EventContexts } from "./EventContexts";
import Button from "react-bootstrap/Button";

const PopUpOuter = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PopUpInner = styled.div`
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  border-radius: 20px;
  background: white;
`;

const XButton = styled.div`
  border: 1px solid lightgray;
  color: white;
  background: lightgray;
  height: 18px;
  width: 18px;
  cursor: pointer;
  margin-right: 10px;
  line-height: 17px;
  border-radius: 50%;
`;

const RightFlexBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
`;
const CenterBox = styled.div`
  display: block;
  justify-content: center;
`;
const Paragraph = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 90%;
  max-height: calc(130px + 5vw);
  border-radius: 15px;
  border: 2px solid #73ad21;
  word-wrap: break-word;
  margin: auto;
`;

const ButtonWrapper = styled.div`
  bottom: 4px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export default function CurrentEventPopUp() {
  const {
    setIsEventPopUpOpen,
    eventId,
    eventsData,
    deleteEvent,
    editEvent,
  } = useContext(EventContexts);
  const [eventName] = useState(eventsData[eventId].name);
  const [eventDesc] = useState(eventsData[eventId].desc);
  const [eventDate] = useState(eventsData[eventId].date);
  return (
    <PopUpOuter>
      <PopUpInner>
        <RightFlexBox>
          <XButton onClick={() => setIsEventPopUpOpen(false)}>&times;</XButton>
        </RightFlexBox>
        <h2>{eventName}</h2>
        <CenterBox>
          <h6>{"Time: " + eventDate.toLocaleString()}</h6>
          <h6>Description: </h6>
          <Paragraph>{eventDesc}</Paragraph>
          <ButtonWrapper>
            <Button variant="warning" onClick={() => editEvent(eventId)}>
              Edit
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => deleteEvent(eventId)}
              variant="danger"
            >
              Delete
            </Button>
          </ButtonWrapper>
        </CenterBox>
      </PopUpInner>
    </PopUpOuter>
  );
}

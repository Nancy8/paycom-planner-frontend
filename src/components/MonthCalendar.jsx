import React, { useContext, useState } from "react";
import Day from "./MonthCalendarDay";
import styled from "@emotion/styled";
import { EventContexts } from "./EventContexts";
// Is SimpleMenu used?
import SimpleMenu from "./SimpleMenu";


const Table = styled.table`
  border: 1px solid black;
  width: 80%;
  min-width: 450px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0;
  table-layout: fixed;
  background: #fdfdfd;
`;
const Thead = styled.thead`
  margin-bottom: 0;
  padding-bottom: 0;
`;

const Button = styled.div`
  height: 100%;
  width: 50%;
  min-width: 60px;
  margin: 0px;
  border: 1px solid limegreen;
  background: linear-gradient(#99b799, #eaeaea);
  border-radius: 2px;
  font-size: calc(6px + 0.5vw);
  line-height: 18px;
  cursor: pointer;
  transform: translateX(50%);
`;

const dayIds = [[0, 1, 2, 3, 4, 5, 6],
                [7, 8, 9, 10, 11, 12, 13],
                [14, 15, 16, 17, 18, 19, 20],
                [21, 22, 23, 24, 25, 26, 27],
                [28, 29, 30, 31, 32, 33, 34],
                [35, 36, 37, 38, 39, 40, 41]];

const Td = styled.td`
  border: 1px solid black;
  font-size: calc(6px + 0.5vw);
`;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const MonthCalendar = React.memo(() => {
  const { month, setMonth, year, setYear } = useContext(EventContexts);
  // I am wondering if month needs to be a shared variable?  It looks like it is only used in this component.  But I might be missing something.

  function subtractMonth(){
    if(month === 0){
      setYear(year -1);
      setMonth(11)
    }else{
      setMonth(month - 1)
    }
  }
  function addMonth(){
    if(month === 11){
      setYear(year +1);
      setMonth(0)
    }else{
      setMonth(month +1)
    }
  }

  // Javascript already has a getDate method.  You might want to name this something different to avoid confusion
  // Actually, not sure I completely understand what is going on with this function
  function getDate(y, m, d){
    let firstDay = new Date(y, m, 1);
    let lastDay = new Date(y, m + 1, 0);
    let prevMonthLastDay = new Date(y, m, 0);
    // firstDay is hardcoded to the first day of the month (line 93).  So firstDay.getDay() will always be 1, won't it?
    // isn't this line the same as if(1 > d) == will this ever happen?
    if(firstDay.getDay() > d){
      m--;
      if(m === -1){
        y--;
        m = 11;
      }
      d = prevMonthLastDay.getDate() - firstDay.getDay() +1 + d;
    }else if(lastDay.getDate() < (d - firstDay.getDay() + 1)){
      m++;
      if(m === 12){
        m = 0;
        y++;
      }
      d = d - lastDay.getDate() - firstDay.getDay() + 1;
    }else{
      d = d - firstDay.getDay() + 1;
    }
    return {y, m, d};
  }

  return (
    <div>
      <Table>
        <Thead>
          <tr>
            <Td>{"" + months[month] + " " + year}</Td>
            <td>
              <Button onClick={subtractMonth} className="button">Prev Month</Button>
            </td>
            <td>
              <Button onClick={addMonth} className="button">Next Month</Button>
            </td>
          </tr>
          <tr>
            {days.map((day) => (
              <Td key={day}>{day}</Td>
            ))}
          </tr>
        </Thead>
        <tbody>
          {dayIds.map((week) => (
            <tr key={week[0]}>
            {week.map((day) => (
              <Day
                key={day}
                date={getDate(year, month, day)}
              />
            ))}
            </tr>
          ))} 
        </tbody>
      </Table>
    </div>
  );
});

export default MonthCalendar;

import React, { useState } from "react";
import { next, previous, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ReservationList from "./ReservationList";


function Dashboard() {
  const query = useQuery();
  const queryDate = query.get("date")
  const [date, setDate] = useState(queryDate || today)

  const toggleToPrevious = (event) => {
    event.preventDefault();
    setDate(previous);
  }

  const toggleToNext = (event) => {
    event.preventDefault();
    setDate(next);
  }

  const toggleToToday = (event) => {
    event.preventDefault();
    if (date !== today) {
      setDate(today);
    }
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <br />
        <div className="container">
          <h4 className="row">Reservations for {date.slice(0, 10)}</h4>
          <div className="row">
            <button onClick={toggleToPrevious}>Previous</button>
            <button onClick={toggleToToday}>Today</button>
            <button onClick={toggleToNext}>Next</button>
          </div>
        </div>
      </div>
      <ul className="list-group my-2">
        <ReservationList date={date} />
      </ul>
    </main>
  )
}

export default Dashboard;
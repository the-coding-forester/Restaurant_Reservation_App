import React, { useState } from "react";
import { next, previous, today } from "../utils/date-time";
import ReservationList from "./ReservationList";


// function Dashboard({ date }) {
//   const [reservations, setReservations] = useState([]);
//   const [reservationsError, setReservationsError] = useState(null);

//   useEffect(loadDashboard, [date]);

//   function loadDashboard() {
//     const abortController = new AbortController();
//     setReservationsError(null);
//     listReservations({ date }, abortController.signal)
//       .then(setReservations)
//       .catch(setReservationsError);
//     return () => abortController.abort();
//   }

//   return (
//     <main>
//       <h1>Dashboard</h1>
//       <div className="d-md-flex mb-3">
//         <h4 className="mb-0">Reservations for date</h4>
//       </div>
//       <ErrorAlert error={reservationsError} />
//       {JSON.stringify(reservations)}
//     </main>
//   );
// }

function Dashboard() {
  const [date, setDate] = useState(today)

  const toggleToYesterday = (event) => {
    event.preventDefault();
    setDate(previous);
  }

  const toggleToTomorrow = (event) => {
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
        <h4 className="mb-0">Reservations for</h4>
        <fieldset>
          <button onClick={toggleToYesterday}>Yesterday</button>
          <button onClick={toggleToToday}>Today</button>
          <button onClick={toggleToTomorrow}>Tomorrow</button>
        </fieldset>
      </div>
      <ul className="list-group my-2">
        <ReservationList date={date} />
      </ul>
    </main>
  )
}

export default Dashboard;

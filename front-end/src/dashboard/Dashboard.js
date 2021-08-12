import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { next, previous, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ReservationList from "./ReservationList";
import TableList from "./TableList";


function Dashboard() {
  const query = useQuery();
  const queryDate = query.get("date")

  const [date, setDate] = useState(queryDate || today)
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesErrors, setTablesErrors] = useState(null);
  const [updatedTableSeat, setUpdatedTableSeat] = useState(null);
  const [cancelledReservation, setCancelledReservation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const results = await listReservations({ date })
        setReservations(results)
      } catch (err) {
        setReservationsError(err)
      }
    })();
  }, [date, tables, cancelledReservation])

  useEffect(() => {
    (async () => {
      try {
        const result = await listTables({});
        setTables(result)
      } catch (err) {
        setTablesErrors(err)
      }
    })();
  }, [updatedTableSeat])

  const onUpdateTable = (updatedTable) => {
    setUpdatedTableSeat(updatedTable);
  }

  const onCancelReservation = (cancelledReservation) => {
    setCancelledReservation(cancelledReservation);
  }

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
      <div className="row justify-content-md-center">
        <h1 className="d-none d-lg-block"> Dashboard</h1>
      </div>
      <br />
      <div>
        <div className="row justify-content-md-center">
          <h2 className="col-lg-6">Reservations: {date.slice(0, 10)}</h2>
        </div>
        <div className="row justify-content-md-center">
          <button className="col" onClick={toggleToPrevious}>Previous</button>
          <button className="col" onClick={toggleToToday}>Today</button>
          <button className="col" onClick={toggleToNext}>Next</button>
        </div>
      </div>
      <br />
      <ReservationList
        reservations={reservations}
        reservationsError={reservationsError}
        onCancelReservation={onCancelReservation}
      />
      <h4 className="row">Tables</h4>
      <ul className="list-group my-2">
        <TableList
          tables={tables}
          tablesErrors={tablesErrors}
          onUpdateTable={onUpdateTable}
        />
      </ul>
    </main>
  )
}

export default Dashboard;
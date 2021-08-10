import React, { useEffect, useState } from "react";
import { next, previous, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ReservationList from "./ReservationList";
import TableList from "./TableList";
import { listReservations } from "../utils/api";
import { listTables } from "../utils/api";


function Dashboard() {
  const query = useQuery();
  const queryDate = query.get("date")
  const [date, setDate] = useState(queryDate || today)
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesErrors, setTablesErrors] = useState(null);
  const [updatedTableSeat, setUpdatedTableSeat] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const results = await listReservations({ date })
        setReservations(results)
      } catch (err) {
        setReservationsError(err)
      }
    })();
  }, [date, tables])

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
        <ReservationList
          date={date}
          reservations={reservations}
          reservationsError={reservationsError}
        />
      </ul>
      <div className="container">
        <h4 className="row">Tables</h4>
        <ul className="list-group my-2">
          <TableList
            tables={tables}
            tablesErrors={tablesErrors}
            onUpdateTable={onUpdateTable}
          />
        </ul>
      </div>
    </main>
  )
}

export default Dashboard;
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { listTables, readReservation, readTable, updateTable } from "../utils/api";


function SeatReservationPage() {
  let history = useHistory();
  const { reservation_id } = useParams();

  const [reservation, setReservation] = useState(null);
  const [tables, setTables] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await readReservation(reservation_id)
      setReservation(result)
      const available = await listTables({ occupied: false })
      setTables(available)
    })();
  }, [reservation_id])


  if (reservation === null) {
    return (
      <div className="SeatReservation">
        <h1>Reservation does not exist</h1>
      </div>
    )
  }

  if (tables === null) {
    return (
      <div className="SeatReservation">
        <h1>Not tables currently available</h1>
      </div>
    )
  }

  const {
    reservation_date,
    reservation_time,
    first_name,
    last_name,
    people,
  } = reservation;

  const reservationInfoSentence = `${reservation_date} at ${reservation_time.slice(0, 5)} - ${first_name} ${last_name} party of ${people}`

  const handleSelectTable = async (event) => {
    event.preventDefault();
    const id = event.target.value;
    const thisTable = await readTable(id)
    setSelectedTable(thisTable);
  }

  const handleClickCancel = (event) => {
    event.preventDefault();
    history.goBack();
  }

  const handleClickSubmit = async (event) => {
    event.preventDefault();

    if (selectedTable === null) {
      return (
        <div className="SeatReservation">
          <h1>No table has been selected</h1>
        </div>
      )
    }
    await updateTable(selectedTable.table_id, reservation_id);

    history.push("/dashboard")
  }

  return (
    <div className="SeatReservation">

      <h1>Seat Reservation</h1>
      <br />
      <h2>{reservationInfoSentence}</h2>
      <br />
      <div className="d-md-flex mb-3">
        <select className="form-select bg-light" onChange={handleSelectTable} name="table_id">
          <option defaultValue>Available tables</option>
          {tables.map((table) => (
            <option key={table.table_id} value={table.table_id} >{`${table.table_name} - ${table.capacity}`}</option>
          ))}
        </select>
      </div>

      <br />
      <button
        onClick={handleClickCancel}
        className="btn btn-secondary mr-2"
      >
        Cancel
      </button>
      <button
        type="submit"
        onClick={handleClickSubmit}
        className="btn btn-secondary mr-2"
      >
        Submit
      </button>
    </div>
  )
}

export default SeatReservationPage;
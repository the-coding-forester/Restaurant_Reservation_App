import { useState } from "react";
import ReservationList from "../dashboard/ReservationList";
import ErrorAlert from "../Errors/ErrorAlert";
import { listReservations } from "../utils/api";

function SearchByMobile() {
  const [input, setInput] = useState("")
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const onChange = (event) => setInput(event.target.value)

  const handleClickFind = async (event) => {
    event.preventDefault();

    try {
      const results = await listReservations({ mobile_number: input })
      setReservations(results)
    } catch (err) {
      setReservationsError(err)
    };

  };

  return (
    <div className="SearchByMobile">
      <h1><span className="oi oi-magnifying-glass"> Search</span></h1>
      <form className="search-form">
        <label className="form-label form-control-lg" htmlFor="mobile_number">
          Phone Number
        </label>
        <input
          className="form-control"
          type="tel"
          id="mobile_number"
          name="mobile_number"
          placeholder="Enter a customer's phone number"
          value={input}
          onChange={onChange}
        />
        <br />
        <button className="btn btn-success" type="submit" onClick={handleClickFind}>Find</button>
      </form>
      <br />
      <ErrorAlert error={reservationsError} />
      {reservations.length > 0 ?
        <ReservationList reservations={reservations} reservationsError={reservationsError} page="search" />
        :
        `No reservations found for ${input}.`
      }
    </div>
  )
}

export default SearchByMobile;
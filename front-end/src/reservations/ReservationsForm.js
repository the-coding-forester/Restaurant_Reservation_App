import React from "react"

function ReservationForm({
  first_name,
  last_name,
  onFirst_nameChange,
  onLast_nameChange,
  mobile_number,
  onMobile_numberChange,
  reservation_date,
  onReservation_dateChange,
  reservation_time,
  onReservation_timeChange,
  people,
  onPeopleChange,
  onSubmit,
  onCancel }) {


  const handleFirst_nameChange = (event) => onFirst_nameChange(event.target.value);
  const handleLast_nameChange = (event) => onLast_nameChange(event.target.value);
  const handleMobile_numberChange = (event) => onMobile_numberChange(event.target.value);
  const handlePeopleChange = (event) => onPeopleChange(event.target.value);
  const handleReservation_dateChange = (event) => onReservation_dateChange(event.target.value);
  const handleReservation_timeChange = (event) => onReservation_timeChange(event.target.value);


  const handleClickCancel = (event) => {
    event.preventDefault();
    onCancel();
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="reservation-edit" onSubmit={handleSubmitForm}>
      <div className="form-group">
        <label htmlFor="first_name">First name</label>
        <input
          id="first_name"
          type="text"
          first_name="first_name"
          className="form-control"
          required
          placeholder="First Name"
          onChange={handleFirst_nameChange}
          value={first_name} />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last name</label>
        <input
          id="last_name"
          type="text"
          last_name="last_name"
          className="form-control"
          required
          placeholder="Last Name"
          onChange={handleLast_nameChange}
          value={last_name} />
      </div>
      <div className="form-group">
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          id="mobile_number"
          type="text"
          mobile_number="mobile_number"
          className="form-control"
          required
          placeholder="Mobile Number"
          onChange={handleMobile_numberChange}
          value={mobile_number} />
      </div>
      <div className="form-group">
        <label htmlFor="people">Party size</label>
        <input
          id="people"
          type="text"
          people="people"
          className="form-control"
          required
          placeholder="Party Size"
          onChange={handlePeopleChange}
          value={people} />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_date">Reservation Date</label>
        <input
          id="reservation_date"
          type="date"
          reservation_date="reservation_date"
          className="form-control"
          required
          onChange={handleReservation_dateChange}
          value={reservation_date} />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_time">Reservation Time</label>
        <input
          id="reservation_time"
          type="time"
          reservation_time="reservation_time"
          className="form-control"
          required
          onChange={handleReservation_timeChange}
          value={reservation_time} />
      </div>
      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={handleClickCancel}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default ReservationForm;
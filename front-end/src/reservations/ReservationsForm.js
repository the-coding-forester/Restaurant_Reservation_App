import React from "react"

function ReservationForm({
  reservation,
  onReservationChanged,
  onSubmit,
  onCancel }) {


  const handleFirstNameChange = (event) => {
    onReservationChanged({
      ...reservation,
      first_name: event.target.value,
    });
  };

  const handleLastNameChange = (event) => {
    onReservationChanged({
      ...reservation,
      last_name: event.target.value,
    });
  };


  const handleMobileNumberChange = (event) => {
    onReservationChanged({
      ...reservation,
      mobile_number: event.target.value,
    });
  };

  const handlePeopleChange = (event) => {
    onReservationChanged({
      ...reservation,
      people: event.target.value,
    });
  };

  const handleReservationDateChange = (event) => {
    onReservationChanged({
      ...reservation,
      reservation_date: event.target.value,
    });
  };

  const handleReservationTimeChange = (event) => {
    onReservationChanged({
      ...reservation,
      reservation_time: event.target.value,
    });
  };


  const handleClickCancel = (event) => {
    event.preventDefault();
    onCancel();
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();
    //add state validation
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
          onChange={handleFirstNameChange}
          value={reservation.first_name} />
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
          onChange={handleLastNameChange}
          value={reservation.last_name} />
      </div>
      <div className="form-group">
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          id="mobile_number"
          type="tel"
          mobile_number="mobile_number"
          className="form-control"
          required
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123-456-7890"
          minLength="9"
          onChange={handleMobileNumberChange}
          value={reservation.mobile_number} />
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
          value={reservation.people} />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_date">Reservation Date</label>
        <input
          id="reservation_date"
          type="date"
          reservation_date="reservation_date"
          className="form-control"
          required
          onChange={handleReservationDateChange}
          value={reservation.reservation_date} />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_time">Reservation Time</label>
        <input
          id="reservation_time"
          type="time"
          reservation_time="reservation_time"
          className="form-control"
          required
          onChange={handleReservationTimeChange}
          value={reservation.reservation_time} />
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
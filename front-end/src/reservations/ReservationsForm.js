import React from "react"

function ReservationForm({ firstName, lastName, onFirstNameChange, onLastNameChange, mobileNumber, onMobileNumberChange, partySize, onPartySizeChange, date, onDateChange, reservationTime, onTimeChange, onSubmit, onCancel }) {
  const handleFirstNameChange = (event) => onFirstNameChange(event.target.value);
  const handleLastNameChange = (event) => onLastNameChange(event.target.value);
  const handleMobileNumberChange = (event) => onMobileNumberChange(event.target.value);
  const handlePartySizeChange = (event) => onPartySizeChange(event.target.value);



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
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          type="text"
          firstName="firstName"
          className="form-control"
          required
          placeholder="First Name"
          onChange={handleFirstNameChange}
          value={firstName} />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          type="text"
          lastName="lastName"
          className="form-control"
          required
          placeholder="First Name"
          onChange={handleLastNameChange}
          value={lastName} />
      </div>
      <div className="form-group">
        <label htmlFor="mobileNumber">Mobile Number</label>
        <input
          id="mobileNumber"
          type="text"
          mobileNumber="mobileNumber"
          className="form-control"
          required
          placeholder="First Name"
          onChange={handleMobileNumberChange}
          value={mobileNumber} />
      </div>
      <div className="form-group">
        <label htmlFor="partySize">Party size</label>
        <input
          id="partySize"
          type="text"
          partySize="partySize"
          className="form-control"
          required
          placeholder="First Name"
          onChange={handlePartySizeChange}
          value={partySize} />
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
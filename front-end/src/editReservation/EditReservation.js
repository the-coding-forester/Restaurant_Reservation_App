import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../Errors/ErrorAlert";
import ReservationForm from "../reservations/ReservationsForm";
import { readReservation, updateReservation } from "../utils/api";
import validateForms from "../utils/validateForms";


function EditReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();

  const [editedReservation, setEditedReservation] = useState({});

  const [reservationsErrors, setReservationErrors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const results = await readReservation(reservation_id)
        setEditedReservation(results);
      } catch (err) {
        setReservationErrors(err)
      }
    })();
  }, [reservation_id])

  const handleEditReservation = async () => {
    try {
      const errors = validateForms(editedReservation);
      if (errors.length) {
        setReservationErrors(errors)
        return
      }
      const result = await updateReservation(editedReservation);
      history.push(`/dashboard?date=${result.reservation_date}`);

    } catch (err) {
      setReservationErrors([err])
    }
  }

  const handleCancelEdit = () => {
    history.goBack();
  }

  return (
    <div className="edit-reservation">
      <h1>Edit Reservation</h1>
      <ReservationForm
        reservation={editedReservation}
        onReservationChanged={setEditedReservation}
        onCancel={handleCancelEdit}
        onSubmit={handleEditReservation}
      />
      {reservationsErrors.map((error) => {
        return <ErrorAlert key={error} error={error} />;
      })}
    </div>
  )
}

export default EditReservation;
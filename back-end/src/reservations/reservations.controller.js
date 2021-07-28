/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const onlyValidProperties = require("../errors/onlyValidProperties");

// Validation Middleware

const required_properties = [
  "first_name",
  "last_name",
  "people",
  "mobile_number",
  "reservation_date",
  "reservation_time",
];
const valid_properties = [
  "first_name",
  "last_name",
  "people",
  "status",
  "mobile_number",
  "reservation_date",
  "reservation_time",
];

// Validate that reservation exists
const reservationExists = async (req, res, next) => {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservationId} cannot be found.`,
  });
};

// Validate is reservation id is present
const reservationIdIsPresent = (req, res, next) => {
  const { reservationId } = req.params;
  const { reservation_id } = res.locals.reservation;
  if (!reservation_id || Number(reservation_id) === Number(reservationId)) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_id '${reservation_id}' should be absent or match url '${reservationId}'.`,
  });
}

// Validate date of reservation
const hasValidDate = (req, res, next) => {
  const date = req.body.data.reservation_date;
  const valid = Date.parse(date);

  if (valid) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_date '${date}' is not a date.`,
  });
}

async function list(req, res) {
  res.json({
    data: [],
  });
}

// Validate time of reservation
const hasValidTime = (req, res, next) => {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const time = req.body.data.reservation_time;
  const valid = time.match(regex);

  if (valid) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_time '${time}' is not a time.`,
  });
}

// Validate party size
const hasValidPeople = (req, res, next) => {
  const people = req.body.data.people;
  const valid = Number.isInteger(people);

  if (valid && people > 0) {
    return next();
  }
  next({
    status: 400,
    message: `people '${people}' is not a valid integer`,
  });
}


module.exports = {
  list,
};

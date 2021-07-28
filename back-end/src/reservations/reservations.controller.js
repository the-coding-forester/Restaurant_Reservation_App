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

const hasOnlyValidProperties = onlyValidProperties(valid_properties);
const hasRequiredProperties = hasProperties(required_properties);

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

// CRUD Functions

// Create for Route ('/reservations/new')
const create = async (req, res) => {
  const data = await service.create(req.body.data);
  res.status(201).json({ data })
}

// Read for Route ('/reservations/:reservationId')
const read = (req, res) => {
  const { reservation_id } = req.params;
  const data = await service.read(reservation_id);
  res.json({ data });
}


const list = async (req, res) => {
  const { date } = req.query;

  if (date) {
    const data = await service.listReservationsOnDay(date);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidDate,
    hasValidTime,
    hasValidPeople,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
};

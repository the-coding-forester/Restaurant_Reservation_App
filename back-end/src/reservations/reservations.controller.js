/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// VALIDATION MIDDLEWARE

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status"
];

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "people",
  "mobile_number",
  "reservation_date",
  "reservation_time",
];

const hasOnlyValidProperties = (req, res, next) => {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

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

// Return error if reservation is on a Tuesday
const reservationNotForTuesday = (req, res, next) => {
  const { reservation_date } = req.body.data
  const dayOfWeek = new Date(reservation_date).getUTCDay();
  // Tuesday would be represented by 2

  if (dayOfWeek !== 2) {
    return next();
  }
  next({
    status: 400,
    message: `Restaurant closed on Tuesdays`
  })
}

// Return error if reservation is for a day in the past
const reservationForFutureDate = (req, res, next) => {
  const { reservation_date, reservation_time } = req.body.data
  const today = Date.now();
  const dateInQuestion = new Date(reservation_date + ' ' + reservation_time)

  if (dateInQuestion > today) {
    return next();
  }
  next({
    status: 400,
    message: `Reservation must be made for a future time and date`
  })
}

// Return error if reservation is NOT between 10:30am and 9:30pm
const reservationForValidTime = (req, res, next) => {
  const { reservation_time } = req.body.data
  //splice to make format HHMM and never HHMMSS
  const resTime = reservation_time.split(':').splice(4).join('');

  if (resTime >= 1030 && resTime <= 2130) {
    return next();
  }
  next({
    status: 400,
    message: `Reservations can only be made for between 9:30AM and 9:30PM. The restaurant closes at 10:30PM.`
  })
}

// CRUD Functions

const create = async (req, res) => {
  const data = await service.create(req.body.data);
  res.status(201).json({ data })
}

const list = async (req, res) => {
  const { date } = req.query;

  if (date) {
    const data = await service.listReservationsByDay(date);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

const read = async (req, res,) => {
  const data = res.locals.reservation;
  res.json({ data });
}

async function update(req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await service.update(updatedReservation);
  res.json({ data });
}

async function destroy(req, res) {
  const { reservation } = res.locals;
  await service.delete(reservation.reservation_id);
  res.sendStatus(204);
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    reservationNotForTuesday,
    reservationForFutureDate,
    reservationForValidTime,
    asyncErrorBoundary(create)
  ],
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  update: [
    asyncErrorBoundary(reservationExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update)
  ],
  delete: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(destroy)
  ],
};

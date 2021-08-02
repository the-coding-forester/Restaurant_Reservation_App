const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationService = require("../reservations/reservations.service")

// VALIDATION MIDDLEWARE
const VALID_PROPERTIES = [
  "table_name",
  "capacity"
];

const REQUIRED_PROPERTIES = [
  "table_name",
  "capacity",
  "reservation_id"
];

// Checks if properties are valid
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

// Checks if it has all the required properties
const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

// Check if table exists
const tableExists = (req, res, next) => {
  const id = req.params.table_id;
  const table = await service.read(Number(id));

  //if table exists move on
  if (table) {
    res.locals.table = table;
    return next();
  }
  //return error if table doesn't exist
  return next({
    status: 404,
    message: `Table with id: ${id}, not found.`
  });
}

// Check if table has name
const hasValidName = (req, res, next) => {
  const { table_name } = req.body.data;

  // check that length of table name is at least 2, not empty, and exists
  if (table_name.length >= 2) {
    return next();
  }
  //return error if table name is less than 2 characters
  next({
    status: 400,
    message: `The table name for: ${table_name}, must be at least 2 characters long.`
  });
}

// Check if capacity is at least one
const hasValidCapacity = (req, res, next) => {
  const { capacity } = req.body.data;

  // check that capacity is a number AND at least 1
  if (Number.isInteger(capacity) && capacity >= 1) {
    return next();
  }
  next({
    status: 400,
    message: `The table capacity must be at least 1.`
  });
}

// Check that the attached reservation has an id
const hasReservationId = (req, res, next) => {
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    next({
      status: 400,
      message: `You need to have a reservation_id.`
    });
  }
  return next();
}

// Check that attached reservation exists
const reservationIdExists = (req, res, next) => {
  const { reservation_id } = req.body.data;
  const reservation = await reservationService.read(reservation_id);
  if (!reservation) {
    next({
      status: 400,
      message: `The reservation id ${reservation_id} does not exist.`
    });
  }
  return next();
}

// Check that table is occupied
const isOccupied = async (req, res, next) => {
  const table_id = req.params.table_id;
  const table = await service.read(table_id);
  if (table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table is occupied.`
  });
}

// Check that capacity is sufficient for reservation
const hasCapacityForRes = async (req, res, next) => {
  const { reservation, table } = res.locals;

  if (table.capacity >= reservation.people) {
    return next();
  }
  next({
    status: 400,
    message: `The table capacity is to small for the reservation. Table capacity: ${table.capacity}, Party size: ${reservation.people}.`,
  });
}

// CRUD FUNCTIONS

const create = async (req, res) => {
  const data = await service.create(req.body.data);
  res.status(201).json({ data })
}

const list = async (req, res) => {
  const data = await service.list();
  res.json({ data });
}

const read = async (req, res) => {
  const data = res.locals.table;
  res.json({ data });
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidName,
    hasValidCapacity,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
  read: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(read),
  ],
}
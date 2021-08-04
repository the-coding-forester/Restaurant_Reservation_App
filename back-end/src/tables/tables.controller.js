const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties")

// VALIDATION MIDDLEWARE
const VALID_PROPERTIES = [
  "table_name",
  "capacity",
  "reservation_id",
  "people"
];

const REQUIRED_PROPERTIES = [
  "table_name",
  "capacity",
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
const tableExists = async (req, res, next) => {
  const { tableId } = req.params;
  const table = await service.read(tableId);

  //if table exists move on
  if (table) {
    res.locals.table = table;
    return next();
  }
  //return error if table doesn't exist
  return next({
    status: 404,
    message: `Table_id ${tableId} not found.`
  });
}

// Check if table has name
const hasValidName = (req, res, next) => {
  const { table_name } = req.body.data;

  if (table_name.length < 2) {
    //return error if table name is less than 2 characters
    return next({
      status: 400,
      message: `The table_name '${table_name}' must be at least 2 characters long.`
    });
  }
  return next();
}

// Check if capacity is at least one
const hasValidCapacity = (req, res, next) => {
  const { capacity } = req.body.data;

  // check that capacity is a number AND greater than 0
  if (capacity > 0 && Number.isInteger(capacity)) {
    return next();
  }
  next({
    status: 400,
    message: `Table capacity '${capacity}' must be a number greater than 0.`
  });
}

// // Check that capacity is sufficient for reservation
// const hasCapacityForRes = async (req, res, next) => {
//   const { reservation, table } = res.locals;

//   if (table.capacity >= reservation.people) {
//     return next();
//   }
//   next({
//     status: 400,
//     message: `The table capacity is to small for the reservation. Table capacity: ${table.capacity}, Party size: ${reservation.people}.`,
//   });
// }

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

const update = async (req, res) => {
  const table_id = req.params.tableId;
  const updatedTable = {
    ...req.body.data,
    table_id: table_id,
    occupied: true,
  }
  const data = await service.update(updatedTable);
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
  update: asyncErrorBoundary(update),
}
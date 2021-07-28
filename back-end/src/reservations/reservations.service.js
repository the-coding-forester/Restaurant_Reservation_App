const knex = require("../db/connection");

// Create reservation
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((newReservation) => newReservation[0]);
}

// View reservation
function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .then((reservation) => reservation[0]);
}

// List reservations
function list() {
  return knex("reservations");
}


module.exports = {
  create,
  read,
  list,
};
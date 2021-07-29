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
    .where({ reservation_id: reservation_id })
    .first();
}

// List reservations
function list() {
  return knex("reservations")
    .select("*");
}

// List reservations on date
function listReservationsByDay(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: reservation_date })
    .orderBy("reservation_time")
}

// Update Reservation
function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  create,
  read,
  list,
  listReservationsByDay,
};
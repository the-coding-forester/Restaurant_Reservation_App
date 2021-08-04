const knex = require("../db/connection");

// Create table
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((newTable) => newTable[0]);
}

// List tables
function list() {
  return knex("tables")
    .select("*")
    .orderBy("table_name")
}

// View tables
function read(table_id) {
  return knex("tables as t")
    .leftJoin("reservations as r", "r.reservation_id", "t.reservation_id")
    .select(
      "t.table_id",
      "t.table_name",
      "t.capacity",
      "t.reservation_id",
      "r.first_name",
      "r.last_name",
      "r.mobile_number",
      "r.reservation_date",
      "r.reservation_time",
      "r.people",
      "r.status",
      "r.created_at as reservation_created",
      "r.updated_at as reservation_updated"
    )
    .where({ table_id })
    .then((result) => result[0]);
}

// View reservation
function readReservation(reservation_id) {
  return knex("reservations")
    .where({ reservation_id })
    .then((result) => result[0]);
}

// View reservation by table
function readTableByReservation(reservation_id) {
  return knex("tables")
    .where({ reservation_id })
    .whereExists(knex.select("*").from("tables").where({ reservation_id }))
    .then((result) => result[0]);
}

// Update seat reservation
async function updateSeatReservation(reservation_id, table_id) {
  const trx = await knex.transaction();
  let updatedTable = {};
  return trx("reservations")
    .where({ reservation_id })
    .update({ status: "seated" })
    .then(() =>
      trx("tables")
        .where({ table_id })
        .update({ reservation_id }, [
          "table_id",
          "table_name",
          "capacity",
          "reservation_id",
        ])
        .then((result) => (updatedTable = result[0]))
    )
    .then(trx.commit)
    .then(() => updatedTable)
    .catch(trx.rollback);
}

// delete seat reservation
async function deleteSeatReservation(table_id, reservation_id) {
  const trx = await knex.transaction();

  return trx("reservations")
    .where({ reservation_id })
    .update({ status: "finished" })
    .then(() =>
      trx("tables").where({ table_id }).update({ reservation_id: null })
    )
    .then(trx.commit)
    .catch(trx.rollback);
}

module.exports = {
  create,
  list,
  read,
  readReservation,
  readTableByReservation,
  updateSeatReservation,
  deleteSeatReservation,
};
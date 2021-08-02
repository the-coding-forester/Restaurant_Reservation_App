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
  return knex("tables")
    .select("*")
    .where({ table_id: table_id })
    .first();
}

module.exports = {
  create,
  list,
  read,
}
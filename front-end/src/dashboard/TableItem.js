import React from "react";
import { finishReservation } from "../utils/api";
//import { Link } from "react-router-dom";

function TableItem({ table, onUpdateTable }) {

  const handleFinish = async () => {
    const doesConfirm = window.confirm("Is this table ready to seat new guests? This cannot be undone");
    if (!doesConfirm) {
      return;
    }
    const res = await finishReservation(table.table_id);
    onUpdateTable(res);
  }

  return (
    <tr key={table.table_id}>
      <td> {table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>
        {table.reservation_id ? "occupied" : "free"}
      </td>
      <td>
        {table.reservation_id ?
          <button data-table-id-finish={table.table_id} onClick={handleFinish}>
            Finish
          </button>
          : null}
      </td>
    </tr>
  )
}

export default TableItem;
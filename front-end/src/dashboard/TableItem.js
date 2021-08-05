import React from "react";
import { Link } from "react-router-dom";

function TableItem({ table, onDeleteTable }) {

  const handleDelete = () => {
    // display confirm dialog and allow cancel
    const doesConfirm = window.confirm("Are you sure you want to delete?");
    // return early to exit out of function if not confirmed
    if (!doesConfirm) {
      return;
    }
    onDeleteTable(table);
  }
  return (
    <tr>
      <td> {table.table_name}</td>
      <td>{table.capacity}</td>
      <td>{table.status}</td>
      <td>
        <Link
          to={`/reservations/${table.id}/edit`}
          className="btn btn-secondary mr-2 btn-sm"
          title="Edit" >
          <span className="oi oi-pencil" />
        </Link>
      </td>
      <td>
        <button onClick={handleDelete} className="btn btn-danger btn-sm"><span className="oi oi-trash"></span></button>
      </td>
    </tr>
  )
}

export default TableItem;
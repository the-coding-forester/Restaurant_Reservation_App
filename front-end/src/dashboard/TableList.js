import { useEffect, useState } from "react";
import ErrorAlert from "../Errors/ErrorAlert";
import { listTables } from "../utils/api";
import TableItem from "./TableItem";


function TableList() {
  const [tables, setTables] = useState([]);
  const [tablesErrors, setTablesErrors] = useState(null);

  useEffect(() => {
    listTables()
      .then((data) => setTables(data))
      .catch(setTablesErrors)
  }, [])


  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <TableItem
              key={table.id}
              table={table}
            />
          ))}
        </tbody>
      </table>
      <ErrorAlert error={tablesErrors} />
    </div>
  )
}

export default TableList;
import { useEffect, useState } from "react";
import ErrorAlert from "../Errors/ErrorAlert";
import { listTables } from "../utils/api";
import TableItem from "./TableItem";


function TableList() {
  const [tables, setTables] = useState([]);
  const [tablesErrors, setTablesErrors] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await listTables({});
        setTables(result)
      } catch (err) {
        setTablesErrors(err)
      }
    })();
  }, [])

  const onUpdateTable = (updatedTable) => {
    const updatedList = tables.map((table) => {
      if (table.table_id === updatedTable.table_id) {
        return updatedTable;
      }
      return table;
    })
    setTables(updatedList);
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
            <th scope="col">Finish</th>
            {/* <th scope="col">Edit</th>
            <th scope="col">Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <TableItem
              key={table.table_id}
              table={table}
              onUpdateTable={onUpdateTable}
            />
          ))}
        </tbody>
      </table>
      <ErrorAlert error={tablesErrors} />
    </div>
  )
}

export default TableList;
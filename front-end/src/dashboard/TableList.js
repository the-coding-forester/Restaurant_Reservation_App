import ErrorAlert from "../Errors/ErrorAlert";
import TableItem from "./TableItem";


function TableList({ tables, tablesErrors, onUpdateTable }) {

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
            <th scope="col">Finish</th>
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
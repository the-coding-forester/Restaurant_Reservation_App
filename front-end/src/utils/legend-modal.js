import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faInfo, faTools } from '@fortawesome/free-solid-svg-icons';

function legendModal() {

  return (
    <div className="modal fade" id="legendModal" tabindex="-1" aria-labelledby="legend" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Legend</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <table>
              <thead>
                <tr className="row">
                  <th className="col">Icon</th>
                  <th className="col">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="row">
                  <td>
                    <span className="oi oi-clock" />
                  </td>
                  <td>Time</td>
                </tr>
                <tr className="row">
                  <td>
                    <span className="oi oi-people" />
                  </td>
                  <td>Party Size</td>
                </tr>
                <tr className="row">
                  <td>
                    <FontAwesomeIcon icon={faInfo}></FontAwesomeIcon>
                  </td>
                  <td>Status</td>
                </tr>
                <tr className="row">
                  <td>
                    <FontAwesomeIcon className="d-lg-none" icon={faTools}></FontAwesomeIcon>
                  </td>
                  <td>Actions/Tools</td>
                </tr>
                <tr className="row">
                  <td>
                    <span className="oi oi-pencil" />
                  </td>
                  <td>Edit</td>
                </tr>
                <tr className="row">
                  <td>
                    <span className="oi oi-trash" />
                  </td>
                  <td>Cancel or Cancelled</td>
                </tr>
                <tr className="row">
                  <td>
                    <span className="oi oi-book" />
                  </td>
                  <td>booked</td>
                </tr>
                <tr className="row">
                  <td>
                    <FontAwesomeIcon className="d-lg-none" icon={faChair}></FontAwesomeIcon>
                  </td>
                  <td>seated</td>
                </tr>
                <tr className="row">
                  <td>
                    <span className="d-lg-none oi oi-check" />
                  </td>
                  <td>finished</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default legendModal;
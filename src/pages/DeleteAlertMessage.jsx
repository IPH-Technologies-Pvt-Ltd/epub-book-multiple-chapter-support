import React from "react";

function DeleteAlertMessage ({setDeleteAlert}) {
    function handleDeleteAlert () {
        setDeleteAlert(false)
    }
    return (
        <div class="alert alert-danger alert-dismissible fade show fw-bold" role="alert">
         You have <strong>Successfully Deleted!</strong> last chapter.
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={handleDeleteAlert}
        ></button>
      </div>
    )
};
export default DeleteAlertMessage;
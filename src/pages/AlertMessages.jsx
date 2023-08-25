import React from "react";

function AlertMessages ({setAddAlert}) {
    function removeAddAlert () {
        setAddAlert(false)
    }
    return (
        <div class="alert alert-success alert-dismissible fade show fw-bold" role="alert">
        <strong>Congratulation!</strong> You are going to write new chapter
        keep it up.
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={removeAddAlert}
        ></button>
      </div>
    )
};
export default AlertMessages;
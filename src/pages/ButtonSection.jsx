import React,{useState} from "react"; 
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "../css/button.css"
import { Button, Modal } from "react-bootstrap";
function ButtonSection ({background, addNewChapter,setChapters, handleGenerateEPUB,setDeleteAlert, handleOut, handleOver,chapters}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteChapter = () => {
    const newChapters = [...chapters];
    newChapters.pop();
    setChapters(newChapters);
    setDeleteAlert(true);
    setShow(false)
  };
    return (
        <div>
          
          <div className="d-sm-flex justify-content-between row">
         {(chapters.length)>1 &&
         (
          <div className=" mb-3 mt-3 col-md-6 col-sm-3 col-lg-4 ">
          <button
            className="btn1 text-white fw-bold w-100"

            onClick={handleShow}
          >
            <DeleteIcon/> Delete Chapter
          </button>
        </div>
         )
         }
        <div className=" mb-3 mt-3 offset-md-1  offset-sm-6 offset-lg-4 col-lg-4 col-md-5">
        <button
          className="btn1 text-white fw-bold w-100"
          onClick={addNewChapter}
        >
          <AddCircleIcon /> Add Chapter
        </button>
      </div>
     
      </div>
      <div className="row d-grid m-3 ">
        <div className="col-md-12 col-sm-6 m-auto">
          <button
            onMouseOver={handleOver}
            onMouseOut={handleOut}
            onClick={handleGenerateEPUB}
            style={{
              backgroundColor: background
                ? "rgba(60, 133, 44, 0.87)"
                : "rgba(57, 145, 30, 0.87)"
            }}
            className="btn2 text-white fw-bolder w-100 rounded-pill"
          >
            GENERATE YOUR OWN EPUB BOOK
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Delete Confirmation </Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure want to delete this chapter ? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success"  onClick={deleteChapter}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
};
export default ButtonSection;
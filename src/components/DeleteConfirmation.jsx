// import React from "react";
// import { Button, Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ConfirmDeletePopup = ({ show, setShow, onDelete }) => {
//   const handleClose = () => setShow(false);
//   const handleDelete = () => {
//     onDelete();
//     setShow(false);
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Confirm Deletion</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         Are you sure you want to delete this item?
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Cancel
//         </Button>
//         <Button variant="danger" onClick={handleDelete}>
//           Delete
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default Confirm```

// Next, integrate this component into your main component:

// ```jsx
// import React, { useState } from "react";
// import { Button } from "react-bootstrap";
// import RemarksPopup from "./RemarksPopup";
// import ConfirmDeletePopup from "./ConfirmDeletePopup";
// import "bootstrap/dist/css/bootstrap.min.css";

// const MainComponent = () => {
//   const [showRemarks, setShowRemarks] = useState(false);
//   const [showConfirmDelete, setShowConfirmDelete] = useState(false);
//   const [remarksData, setRemarksData] = useState([
//     { id: 1, remark: "Completed task A", date: "2025-02-20" },
//     { id: 2, remark: "Meeting with team", date: "2025-02-21" },
//     { id: 3, remark: "Reviewed project B", date: "2025-02-22" },
//     // Add more data as needed
//   ]);

//   const handleShowRemarks = () => setShowRemarks(true);
//   const handleShowConfirmDelete = () => setShowConfirmDelete(true);
//   const handleDelete = () => {
//     // Add your delete logic here
//     console.log("Item deleted");
//   };

//   return (
//     <>
//       <Button variant="dark" onClick={handleShowRemarks}>
//         View Remarks
//       </Button>
//       <Button variant="danger" onClick={handleShowConfirmDelete}>
//         Delete Item
//       </Button>
//       <RemarksPopup show={showRemarks} setShow={setShowRemarks} remarksData={remarksData} />
//       <ConfirmDeletePopup show={showConfirmDelete} setShow={setShowConfirmDelete} onDelete={handleDelete} />
//     </>
//   );
// };

// export default MainComponent;
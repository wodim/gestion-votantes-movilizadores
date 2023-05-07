import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { axiosInstance } from "../../config/axiosInstance";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import MobilizerModal from "./MobilizerModal";

const videoConstraints = {
  facingMode: { exact: "environment" },
};

const MobilizerCamera = ({ isMovilizador, documento, usuarios, usuarioMovilizador }) => {
  const [image, setImage] = useState();
  const webcamRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false)
  const [modalCamara, setModalCamara] = useState(false);

  const togglePreview = () => setModalCamara(!modalCamara);

  const toggle = () => setModal(!modal);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setDisabledButton(true)
    console.log(webcamRef.current)
    setImage(imageSrc)
    togglePreview()
    toggle()
   
  };


  return (
    <>
      <Button
        color="success"
        style={{
          height: "50px",
          fontSize: "30px",
        }}
        onClick={toggle}
      >
        VOTÓ
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Tomar Foto</ModalHeader>
        <ModalBody>
        <Button
            color="success"
            style={{
              width:"100%",
              height: "50px",
              fontSize: "25px",
              textAlign: "center",
              marginBottom:"5px",
             
            }}
            className="button__camera"
            onClick={capture}
          >
            {" "}
            Tomar foto{" "}
          </Button>
          <div className="container">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              mirrored={true}
              width={"500px"}
            />
          </div>

        </ModalBody>
        {/* <ModalFooter>
          <img src={image} alt="" width={"470px"} />
        </ModalFooter> */}
      </Modal>
      <MobilizerModal togglePreview={togglePreview} modalCamara={modalCamara} imagge={image} toggle={toggle} documento={documento} usuarios={usuarios} usuarioMovilizador={usuarioMovilizador} setDisabledButton={setDisabledButton} />
    </>
  );
};

export default MobilizerCamera;

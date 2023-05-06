import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { axiosInstance } from "../../config/axiosInstance";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import axios from "axios";

const videoConstraints = {
  facingMode: { exact: "environment" },
};

const MobilizerCamera = ({ isMovilizador, documento, usuarios, usuarioMovilizador }) => {
  const webcamRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false)

  const toggle = () => setModal(!modal);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const user = decodedToken?.user_id; //localStorage.getItem('token');
    setDisabledButton(true)

    try {
      if(user === documento) {
        const response = await axiosInstance.post(`/users/movilizador/voto/${documento}`, null, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        if(response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Voto guardado",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setDisabledButton(false)
        usuarioMovilizador()
        return

      }
      const formData = new FormData();
      formData.append("image", dataURItoBlob(imageSrc));
      const res = await axiosInstance.post(
        `/upload/${user}/image/${documento}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Foto guardada",
          showConfirmButton: false,
          timer: 1500,
        });
        usuarios();
        setDisabledButton(false)
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al guardar la foto",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      setDisabledButton(false)
      console.log(error.message);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  };

  return (
    <>
      <Button
        color="success"
        style={{
          height: "50px",
          fontSize: "30px",
          display: isMovilizador ? "block" : "none",
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
            // disabled={isMovilizador ? false : true}
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
            />
          </div>

        </ModalBody>
      </Modal>
    </>
  );
};

export default MobilizerCamera;

import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import Swal from "sweetalert2";
import { axiosInstance } from "../../config/axiosInstance";
import jwtDecode from "jwt-decode";

  const MobilizerModal = ({togglePreview, modalCamara, imagge, toggle, documento, usuarios, usuarioMovilizador, setDisabledButton}) => {


const guardarFoto = async () => {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const user = decodedToken?.user_id; //localStorage.getItem('token');
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
      formData.append("image", dataURItoBlob(imagge));
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
      togglePreview()
      console.log(error.message);
    }
}




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
      {/* <Button
        color="primary"
        onClick={guardarFoto}
      >
        Guardar
      </Button> */}
      <Modal isOpen={modalCamara} toggle={togglePreview}>
        <ModalBody>
        <img src={imagge} alt="" width={"470px"} />
           {/* <p>
            ACEPTA GUARDAR LA FOTO ?
           </p> */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={guardarFoto}>
            Guardar
          </Button>
          <Button color="danger" onClick={() => {
            togglePreview()
            toggle()
            }
          }>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MobilizerModal;

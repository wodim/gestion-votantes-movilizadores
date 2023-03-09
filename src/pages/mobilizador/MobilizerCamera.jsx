import React, { useRef } from "react";
import Webcam from "react-webcam";
// import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
// import { axiosInstance } from "../../config/axiosInstance";

// const videoConstraints = {
//   width: 1500,
//   height: 720,
//   facingMode: { exact: "environment" }
// };

const MobilizerCamera = (args) => {
  const webcamRef = useRef(null);
  // const [url, setUrl] = useState(null);
  // const [modalCamara, setModalCamara] = useState(false);
  // const [modal, setModal] = useState(false);

  // const captureFoto = React.useCallback(async () => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setUrl(imageSrc);
  // }, [webcamRef]);

  // const imagen = webcamRef.current;
  // const blob = fetch(imagen).then((response) => response.blob());
  // const file = new File([blob], "Foto del movilizador", {
  //   type: ("image/png", "image/jpeg", "image/svg", "image/webp"),
  //   lastModified: Date.now(),
  // });

  // const openModalCamara = () => {
  //   setModalCamara(true);
  // };
  // const closeModalCamara = () => {
  //   setModalCamara(false);
  // };

  // const openModal = () => {
  //   setModal(true);
  // };
  // const closeModal = () => {
  //   setModal(false);

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   const config = {
  //     headers: { "content-type": "multipart/form-data" },
  //   };
  //   axiosInstance
  //     .post(url, formData, config)
  //     .then(response => response)
  //     .catch((error) => alert(error));
  // };

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    try {
      const formData = new FormData();
      formData.append('image', dataURItoBlob(imageSrc));
      const res = await axios.post('https://backgestionvotantes.com.ar/api/upload/20202020/image/11123123', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }


  return (
    <>
     <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
      {/* <Button
        color="dark"
        size="sm"
        onClick={openModalCamara}
        className="botonFotos"
      >
        Tomar Fotos
      </Button>
      {modalCamara && (
        <Modal isOpen={modalCamara} {...args}>
          <ModalBody>
            <Webcam
              ref={webcamRef}
              audio={false}
              videoConstraints={videoConstraints}
              screenshotFormat={
                ("image/png", "image/jpeg", "image/svg", "image/webp")
              }
              mirrored={true}
              className="camara"
            />
            <Button onClick={captureFoto} className="mb-2" color="primary">
              Sacar Foto
            </Button>
            {url && (
              <div>
                <img src={url} alt="captura de foto" />
                <Button
                  onClick={() => setUrl(null)}
                  className="mt-2"
                  color="danger"
                >
                  Eliminar Foto
                </Button>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                openModal();
                closeModalCamara();
              }}
            >
              Guardar
            </Button>
            <Button color="danger" onClick={closeModalCamara}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      )}

      {/* MODAL ACEPTACION */}
{/* 
      {modal && (
        <Modal isOpen={modal} {...args}>
          <ModalBody>
            <h3>
              <b>¿Desdea guardar la foto?</b>
            </h3>
            <p>Una vez que acepte guarda la foto no se podra volver atras</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                closeModal();
                closeModalCamara();
              }}
            >
              Aceptar
            </Button>
            <Button
              color="danger"
              onClick={() => {
                closeModal();
                openModalCamara();
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      )}  */}
    </>
  );
};

export default MobilizerCamera;

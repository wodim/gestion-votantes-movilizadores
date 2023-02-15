import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import MobilizerCamera from "./MobilizerCamera";

const MobilizerModal = (args) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Button color="danger" outline size="sm" onClick={toggle} className='botonFotos'>
        Tomar Fotos
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalBody>
          <MobilizerCamera />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Guardar
          </Button>
          <Button color="danger" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MobilizerModal;

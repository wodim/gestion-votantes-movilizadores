import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import MobilizerCamera from "./MobilizerCamera";
import MobilizerModal from "./MobilizerModal";

const MobilizerList = (args) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const data = [
    {
      name: "Franco",
      lastName: "Olmi",
      id: 4219378,
      circuito: 4,
    },
    {
      name: "Juan",
      lastName: "Manzur",
      id: 4219378,
      circuito: 4,
    },
    {
      name: "Marcos",
      lastName: "Herrera",
      id: 4219378,
      circuito: 4,
    },
    {
      name: "Luis",
      lastName: "Beltran",
      id: 4219378,
      circuito: 4,
    },
    {
      name: "Jorge",
      lastName: "Olmi",
      id: 4219378,
      circuito: 4,
    },
  ];

const guardarFoto = () => {
    return (
        <MobilizerModal/>
    )
}


  return (
    <div className="mt-5">
      <h3 className="container">Mobilizadores</h3>
      {data.map((item) => {
        return (
          <Card className="cardMobilizer" onClick={toggle}>
            <CardBody>
              <p>
                Nombre: {item.name} {item.lastName}
              </p>
              <p>Circuito: {item.circuito}</p>
              <p>Documento: {item.id}</p>
            </CardBody>
          </Card>
        );
      })}

      {/* MODAL DE LA CAMARA */}
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalBody>
          <MobilizerCamera />
        </ModalBody>
        <ModalFooter>
          <Button color="info" size="sm" onClick={guardarFoto}>
            Guardar
          </Button>
          <Button color="danger" size="sm" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MobilizerList;

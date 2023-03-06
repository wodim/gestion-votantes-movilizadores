import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import MobilizerCamera from "./MobilizerCamera";
import { axiosInstance } from "../../config/axiosInstance";
import jwtDecode from "jwt-decode";

const MobilizerList = () => {
  const [userData, setUserData] = useState([]);

  const usuarios = async (page) => {
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const user = decodedToken?.user_id; //localStorage.getItem('token');

    await axiosInstance
      .get(`users/votantes/${user}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    usuarios();
  }, []);

  console.log(userData, "users");

  // const data = [
  //   {
  //     name: users.nombres,
  //     lastName: users.apellido,
  //     documento: users.documento,
  //     circuito: users.circuito,
  //     id: users.documento,
  //   },
  // ];

  return (
    <div className="mt-5">
      <h3 className="container">Movilizadores</h3>

      {userData.map((item) => {
        return (
          <Card className="cardMobilizer" key={item.id}>
            <CardBody>
              <p>
                Nombre: {item.nombres} {item.apellido}
              </p>
              <p>Circuito: {item.circuito}</p>
              <p>Documento: {item.documento}</p>
            </CardBody>
            <div></div>
            <MobilizerCamera />
          </Card>
        );
      })}
    </div>
  );
};

export default MobilizerList;

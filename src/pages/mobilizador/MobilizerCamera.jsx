import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "reactstrap";

const videoConstraints = {
  width: 1500,
  facinMode: "environment",
};

const MobilizerCamera = () => {
  const webcamRef = useRef(null);

  const [url, setUrl] = useState(null);

  const captureFoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <>
      <Webcam
        ref={webcamRef}
        audio={false}
        onUserMedia={onUserMedia}
        videoConstraints={videoConstraints}
        mirrored={true}
        className="camara"
      />
      <Button onClick={captureFoto} className="mb-2" color="primary">
        Sacar Foto
      </Button>

      {url && (
        <div>
          <img src={url} alt="captura de foto" />
          <Button onClick={() => setUrl(null)} className="mt-2" color="danger">
            Eliminar Foto
          </Button>
        </div>
      )}
    </>
  );
};

export default MobilizerCamera;

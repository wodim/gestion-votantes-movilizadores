import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "reactstrap";

const MobilizerCamera = () => {
  const videoRef = useRef(null);
  const fotoRef = useRef(null);

const [hasFoto, setHasFoto] = useState(false)

const getVideo = () => {
    navigator.mediaDevices
    .getUserMedia(
        {video: true})
    .then( stream => {
        const video = videoRef.current
        video.srcObject = stream
        video.play()
    })
    .catch(err => {
        console.log('esto no va', err)
    })
}

const takeFoto = () => {
    const width = 414
    const height = width / (16/9)

    const video = videoRef.current
    const foto = fotoRef.current

    foto.width = width
    foto.height = height

    const ctx = foto.getContext('2d')
    ctx.drawImage(video, 0, 0, width, height)
    setHasFoto(true)
}

useEffect(() => {
    getVideo()
}, [videoRef])

const borrarFoto = () => {
    const foto = fotoRef.current
    const ctx = foto.getContext('2d')
    ctx.clearRect(0,0, foto.width, foto.height)
    setHasFoto(false)

}

  return (
    <div>
      <div>
        <video ref={videoRef} className='camara'></video>
        <Button onClick={takeFoto} color='primary'>Capturar</Button>
      </div>
      <div className={'result' + (hasFoto ? 'hasFoto': '')}>
        <canvas ref={fotoRef} className='resultado'></canvas>
        <Button color='danger' onClick={borrarFoto}>Borrar Foto</Button>
      </div>
    </div>
  );
};

export default MobilizerCamera;

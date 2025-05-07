import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [detections, setDetections] = useState([]);
  const [statusMsg, setStatusMsg] = useState("");
  const [humanDetected, setHumanDetected] = useState(false);

  const capture = async () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
    setDetections([]);
    setStatusMsg("Processing...");
    setHumanDetected(false);

    try {
      const response = await axios.post("https://human-detect-backend.onrender.com/detect", {
        image: image,
      });

      const { boxes, human_detected } = response.data;
      setDetections(boxes);
      setHumanDetected(human_detected);
      setStatusMsg(
        human_detected ? "✅ Human Detected!" : "❌ No Human Detected."
      );
    } catch (error) {
      console.error("Detection error:", error);
      setStatusMsg("Error during detection.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        style={{ border: "2px solid black" }}
      />
      <br />
      <button onClick={capture} style={{ marginTop: "10px" }}>
        Capture & Detect
      </button>

      {statusMsg && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "18px",
            color: humanDetected ? "green" : "red",
          }}
        >
          {statusMsg}
        </p>
      )}

      {imageSrc && (
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginTop: "20px",
          }}
        >
          <img src={imageSrc} alt="Captured" width={640} height={480} />
          {detections.map((box, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                border: "2px solid red",
                left: `${box.x}px`,
                top: `${box.y}px`,
                width: `${box.width}px`,
                height: `${box.height}px`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;

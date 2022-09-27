import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";

import { signLanguage, fingers } from './fingerpose/Gestures'

import * as fp from "fingerpose";

let action = 'detect';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  let [display, setDisplay] = useState('Loading...');

function loadGesture(){
    action = (action === 'load') ? 'detect' : 'load';
}

  const runHandpose = async () => {
    const net = await handpose.load();
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
      if (
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null &&
          webcamRef.current.video.readyState === 4
      ) {

      setDisplay('')

      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);

      if (hand.length > 0) {

        if(action === 'detect'){
            const GE = new fp.GestureEstimator(signLanguage);
            const gesture = await GE.estimate(hand[0].landmarks, 4);
            if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
                const results = gesture.gestures.map(
                    (prediction) => prediction.confidence
                );
                const maxConfidence = results.indexOf(
                    Math.max.apply(null, results)
                );

                const { name, confidence } = gesture.gestures[maxConfidence];
                setDisplay(`Letter: ${name}<br>Confidence: ${Number(confidence).toFixed(1)}`);
            }
        }
        else if(action === 'load'){
            const style = 'style="border: 1px solid #555555; padding: 3px 5px"';
            let text = `<tr>
                            <th ${style} >Finger</th>
                            <th ${style} >Direction</th>
                            <th ${style} >Curl</th>
                        </tr>`
            for(const name in fingers){
                const GE = new fp.GestureEstimator(fingers[name]);
                const gesture = await GE.estimate(hand[0].landmarks, 4);
                const confidence = gesture.gestures.map(
                    (prediction) => prediction.confidence
                );
                const maxConfidence = confidence.indexOf(
                    Math.max.apply(null, confidence)
                );

                let params = gesture.gestures[maxConfidence].name.split('_');
                text += `<tr>
                            <td ${style} >${params[0]}</td>
                            <td ${style} >${params[1]}</td>
                            <td ${style} >${params[2]}</td>
                        </tr>`
            }
            setDisplay(`<table style="text-align: left;border-collapse: collapse;font-size: 1.3rem;"><tbody>${text}</tbody></table>`);
        }


      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(()=>{runHandpose()});

  return (
    <div className="App">
      <header className="App-header">
          {
              display
                  ? <div style={{
                      position: "absolute",
                      top: '25px',
                      padding: '10px',
                      zIndex: 99,
                      backgroundColor: "dimgrey",
                      borderRadius: "10px",
                  }} dangerouslySetInnerHTML={{__html: display}} ></div>
                  : <div></div>
          }

          <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 1080,
            height: 720,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 1080,
            height: 720,
          }}
        /></header>

        <div style={{
            position: "absolute",
            bottom: "0",
            margin: "20px",
            textAlign: "center",
            width: "100%"
        }} ><a style={{
            color: "White",
            backgroundColor: "blue",
            padding: "5px 10px",
            borderRadius: '5px',
            cursor: "pointer",
        }} onClick={loadGesture} >{action === 'detect' ? 'Load Gesture' : 'Detect Gesture'}</a></div>

    </div>
  );
}

export default App;

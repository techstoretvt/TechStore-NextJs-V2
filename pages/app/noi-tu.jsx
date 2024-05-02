import React, { useRef, useState } from 'react'
// import Head from "next/head";
import Script from 'next/script'


function NoiTu() {
    const [urlChup, setUrlChup] = useState("")
    const iframeRef = useRef(null);

    async function recognizeText({ target: { files } }) {
        Tesseract.recognize(files[0]).then(function (result) {
            console.log("recognizeText: result.text:", result.text);
            document.getElementById("convertedText").value = result.text;
        });
    }

    const handleChupHinh = () => {
        const canvas = document.createElement("canvas");
        const height = 80
        const width = 850
        canvas.width = iframeRef.current.videoWidth;
        canvas.height = iframeRef.current.videoHeight;

        const context = canvas.getContext("2d");
        context.drawImage(iframeRef.current, 500, 0, width + 1000, height, 0, 0, width + 1000, height);

        const image = canvas.toDataURL();
        setUrlChup(image);

        //convert base64 to file
        const arr = image.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const file = new File([u8arr], "sdfsdfdsfsd", { type: mime });
        Tesseract.recognize(file).then(function (result) {
            console.log("recognizeText: result.text:", result.text);
            document.getElementById("convertedText").value = result.text;
        });

    }

    function startScreenSharing() {
        navigator.mediaDevices.getDisplayMedia({
            video: {
                cursor: 'always'
            },
            audio: {
                echoCancellation: true,
                noiseSuppression: true
            }
        }).then(stream => {
            // myStream = stream;

            iframeRef.current.srcObject = stream;
            iframeRef.current.style.display = 'block';


            // stream.getVideoTracks()[0].onended = closeRemoteSharing;
        });
    }

    return (
        <div style={{ backgroundColor: '#fff' }}>
            <div>NoiTu</div>
            <input type="file" id="myFile" name="filename" onChange={(e) => recognizeText(e)} />
            <br />

            <label><b>Your Converted Text:</b></label>
            <br />


            <textarea cols="30" name="original" rows="10" style={{ width: '100%' }} id="convertedText" />

            <video ref={iframeRef} style={{ width: '500px', height: '600px', objectFit: 'cover' }} autoplay controls>

            </video>

            <button onClick={startScreenSharing}>share man hinh</button>
            <button onClick={handleChupHinh}>Chup hinh</button>
            <img src={urlChup}
                // style={{ width: '500px', height: '500px' }} 
                alt="" />


            <Script src="https://cdn.rawgit.com/naptha/tesseract.js/1.0.10/dist/tesseract.js" />
        </div>
    )
}

export default NoiTu

const Face = require('@azure/cognitiveservices-face')
const msRest = require('@azure/ms-rest-js')
require('dotenv').config()

// don't forget to create a .env file with the following content:
const key = process.env.key
const endpoint = process.env.endpoint

// Chris Evans
const url1 = 'https://www.indiewire.com/wp-content/uploads/2019/05/chris-evans-1.jpg'

// Captain America without masks
const url2 = 'https://upload.wikimedia.org/wikipedia/commons/3/33/Mark_Kassen%2C_Tony_C%C3%A1rdenas_and_Chris_Evans_%28cropped%29.jpg'

// Captain America behind the mask
// const url2 = 'https://nypost.com/wp-content/uploads/sites/2/2021/01/chris-evans-captain-america.jpg'

const main = async () => {
    const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
    const client = new Face.FaceClient(credentials, endpoint);

    let faceDetectResult = await client.face.detectWithUrl(url1, {
        returnFaceId: true,
        detectionModel: 'detection_03',
        recognitionModel: 'recognition_04'
    })
    const faceId1 = faceDetectResult._response.parsedBody[0].faceId
    console.log('Face Id 1:', faceId1)


    faceDetectResult = await client.face.detectWithUrl(url2, {
        returnFaceId: true,
        detectionModel: 'detection_03',
        recognitionModel: 'recognition_04'
    })
    const faceId2 = faceDetectResult._response.parsedBody[0].faceId
    console.log('Face Id 2:', faceId2)

    
    const result = await client.face.verifyFaceToFace(faceId1, faceId2)
    console.log('Result:',result.isIdentical, result.confidence.toFixed(3))
}

main()



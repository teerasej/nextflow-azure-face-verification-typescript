
const Face = require('@azure/cognitiveservices-face')
const msRest = require('@azure/ms-rest-js')
require('dotenv').config()

// don't forget to create a .env file with the following content:
const key = process.env.key
const endpoint = process.env.endpoint

const url1 = 'https://en.wikipedia.org/wiki/Joker_(The_Dark_Knight)#/media/File:HeathJoker.png'
const url2 = 'https://en.wikipedia.org/wiki/Heath_Ledger#/media/File:Heath_Ledger_(2).jpg'

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




const Face = require('@azure/cognitiveservices-face')
const msRest = require('@azure/ms-rest-js')
require('dotenv').config()

// don't forget to create a .env file with the following content:
const key = process.env.key
const endpoint = process.env.endpoint


const main = async () => {
    const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
    const client = new Face.FaceClient(credentials, endpoint);

    const url1 = 'https://www.denofgeek.com/wp-content/uploads/2021/03/Heath-Ledger-as-the-Joker-in-The-Dark-Knight.jpg?fit=1300%2C866'
    const url2 = 'https://pbs.twimg.com/profile_images/1487672934613360640/wnrSANEt_400x400.png'

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

    // const faceId1 = 'fc94c889-4e2e-4797-94d4-2d14995e2a3f'
    // const faceId2 = '81d5f303-e417-416a-970c-51888ce6acab'

    const result = await client.face.verifyFaceToFace(faceId1, faceId2)
    console.log('Result:',result.isIdentical, result.confidence.toFixed(3))
}

main()



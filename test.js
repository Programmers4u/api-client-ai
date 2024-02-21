const { ApiHub4aiClient, requestObject } = require('./ApiHub4aiClient.js')

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmNpbkBnYXRlc21zLmV1Iiwic3ViIjoiMTI1ZTBhNzMtZDJmNy00MGVlLTljMzYtOWVjMzhmMTIzNTM1Iiwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE3MDg1MDcxNjQsImV4cCI6MTcwODgwNzE2NH0.iLWRwlzZ_Nk4Tuq3VVL3xfxkHT2_pAFY-4-P_Z0Xmzc'

const api = new ApiHub4aiClient(apiKey);

api.pingPong().then((result) => console.debug(result?.data))

// api.listTasks().then((response) => response?.data).then((listOfTasks) => {
//     listOfTasks.forEach((task) => {
//         console.log(task)
//     })
// })

requestObject.idTask = "fa6bd988-b0dc-495d-bf41-c66b0ac1362f"
requestObject.context = " "
requestObject.ask = "Disney Store is the ultimate Disney shopping destination for kids and adults. Shop from a wide assortment of products including clothes, toys, collectibles, decor and more! We also offer a variety of in-store events that are perfect for all ages. From costumed Character appearances to interactive storytelling sessions with our Disney Storytellers, there's something here for everyone."
api.runTask(requestObject).then((response) => {
    console.log(response?.data?.text)
});
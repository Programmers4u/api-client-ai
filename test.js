import ApiHub4aiClient from 'ApiHub4aiClient.js';
const apiKey = '';
const api = new ApiHub4aiClient(apiKey);
api.listTasks().then((listOfTasks) => {
    listOfTasks.forEach((task) => {
        console.log(task);
    })
});
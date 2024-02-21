const { AIClient, requestObject } = require('./index.js')

const apiKey = 'your key'

const api = new AIClient(apiKey);

api.pingPong().then((result) => console.debug(result?.data))

/**
 * List of tasks
 */
api.listTasks().then((response) => response?.data).then((listOfTasks) => {
    listOfTasks.forEach((task) => {
        console.log(task)
    })
})

/**
 * Any Task run
 */
requestObject.idTask = "your task ID"
requestObject.context = " "
requestObject.ask = " "
api.runTask(requestObject).then((response) => {
    console.log(response?.data?.text)
});
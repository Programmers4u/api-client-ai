import { IRequest } from "../interfaces/request.interface";
import AIClient from "../index";

const userName = "XXX@XXX";
const password = "XXXXXXX";

const startTest = async () => {
  const client = new AIClient();
  await client.login(userName, password);

  const listOfTasks = await client.listTasks();
  console.log(listOfTasks);

  const testText =
    "We are pleased to present a project on which we are currently working with full commitment and passion. We are at the stage of building and internally testing a system that will allow you to maintain efficiency and remain competitive by supporting your work with tools such as: automatic handling of orders, reservations, complaints in text form and via telephone lines, and in the future also active sales (cold calling), lead generation, so that you can focus only on specific customers, without wasting time on calling in vain any market research along with generating results translations from and into 29 languages in real-time (text, audio, image) communication handling, sound (transcription) and image (OCR) agents enabling access to any Internet resources (scrapers), e.g. comments from social media agents enabling audio communication (phone, messengers) programming in your native language, preparing a backendless project, completely changing the approach to building the backend of applications analyzing and generating results of scientific research a browser extension supporting the implementation of any tasks when browsing websites Services for public administration, implementations and assistance in selecting the appropriate artificial intelligence models and tools that will best perform the tasks of modern administration. We also help with implementations and technological consulting of blockchain solutions for public administration.";
  const taskRequest: IRequest = {
    idTask: "52468971-a06e-413d-9b3a-212b53aad693",
    ask: testText,
    context: " ",
  };
  const taskRun = await client.runTask(taskRequest);
  console.log(taskRun);
};

startTest();

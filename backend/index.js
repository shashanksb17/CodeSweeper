const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(express.static("public"));
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("working");
});

app.post("/convert", async (req, res) => {
  const codeInput = req.body.code;
  const targetLanguage = req.body.language;

  try {
    if (!codeInput) {
      return res.send({ message: "No code was provided" });
    }
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Convert the following code into ${targetLanguage} code:\n\n${codeInput}
      (Note: Please keep the explanation concise. If it exceeds 60 letters including spaces, wrap the text to the next line.)`,
      max_tokens: 2000,
    });
    console.log(response.data.choices[0].text);
    res.send({ message: response.data.choices[0].text });
  } catch (error) {
    console.log("entered here");
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.send("Error");
    } else {
      console.log(error.message);
    }
  }
});

app.post("/debug", async (req, res) => {
  const codeInput = req.body.code;

  try {
    if (!codeInput) {
      return res.send({ message: "No code was provided" });
    }
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Debug the following code:\n\n${codeInput}.
      (Note: Please no explanation only the output of the code dhould be returned.)`,
      max_tokens: 1000,
    });
    console.log(response.data.choices[0].text);
    return res.send({ message: response.data.choices[0].text });
  } catch (error) {
    console.log("entered here");
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.send("Error");
    } else {
      console.log(error.message);
    }
  }
});

app.post("/qualitycheck", async (req, res) => {
  const codeInput = req.body.code;

  try {
    if (!codeInput) {
      return res.send({ message: "No code was provided" });
    }

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Please rate the quality of the following code out of ten and provide a brief explanation with pointers:

      ${codeInput}
      
      Quality Rating: ___/10
      
      Explanation:
      - Point 1: ...
      - Point 2: ...
      - Point 3: ...
      - ...
      
      (Note: Please keep the explanation concise. If it exceeds 60 letters including spaces, wrap the text to the next line.)`,
      max_tokens: 1000,
    });

    //changes added

    console.log(response.data.choices[0].text);
    return res.send({ message: response.data.choices[0].text });
  } catch (error) {
    console.log("entered here");
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.send("Error");
    } else {
      console.log(error.message);
    }
  }
});

app.listen(3000, () => {
  console.log(`server is running at port 3000`);
});
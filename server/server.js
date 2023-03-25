const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    res.status(200).send({
        message: "Hello from CodeGPT",
    });
});

app.post("/", async(req, res) => {
    // console.log(req.body);
    try{
        const prompt = req.body.prompt;
        // console.log(prompt);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.1,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        // console.log(response.data.choices);

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch(error) {
        // console.log(error);
        res.status(500).send({ error });
    }
});

app.listen(5000, () => {
    console.log("[+] Server is running on http://localhost:5000");
})
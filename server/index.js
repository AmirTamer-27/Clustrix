require("dotenv").config();
const express = require('express')
const app = express()
const multer = require('multer')
const path = require("path");

const { spawn } = require("child_process");
const fs = require("fs");
const { generateInsights } = require("./utils.js");
const pythonScript = path.join(__dirname, "Pipeline", "rfm.py");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage })

const cors = require('cors')

app.use(cors())
app.use(express.json())

app.post('/analyze', upload.single('dataset'), (req, res) => {
    if (req.file) {
        const filePath = req.file.path
        const pythonProcess = spawn("python3", [
            pythonScript,
            "--file",
            filePath

        ]);
        let result = "";
        let errorOutput = "";

        pythonProcess.stdout.on("data", (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        pythonProcess.on("close", () => {
            if (errorOutput) {
                console.error(errorOutput);
                return res.status(500).send("Error processing dataset");
            }

            const parsedResult = JSON.parse(result);
            return res.status(200).send(parsedResult);
        });

    }
    else {
        return res.status(400).send("Please upload a transactions file")
    }

})

app.post('/segment', upload.single('dataset'), (req, res) => {
    if (req.file && req.body.k) {
        const k = parseInt(req.body.k)
        if (isNaN(k)) {
            return res.status(400).send("K must be a number");
        }
        if (k < 2) {
            return res.status(400).send("K must be at least 2");
        }
        const filePath = req.file.path
        const pythonProcess = spawn("python3", [
            pythonScript,
            "--file",
            filePath,
            "--k",
            k
        ]);
        let result = "";
        let errorOutput = "";

        pythonProcess.stdout.on("data", (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        pythonProcess.on("close", () => {
            if (errorOutput) {
                console.error(errorOutput);
                return res.status(500).send("Error processing dataset");
            }

            const parsedResult = JSON.parse(result);
            fs.unlink(filePath, () => { });
            return res.status(200).send(parsedResult);
        });
    }
    else {
        return res.status(400).send("Please upload a transactions file")
    }
})

app.post('/insights', async (req, res) => {
    const { clusterInfo } = req.body
    const response = await generateInsights(clusterInfo)
    res.send(JSON.parse(response))

})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
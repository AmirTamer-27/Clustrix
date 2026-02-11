const express = require('express')
const app = express()
const multer = require('multer')
const { spawn } = require("child_process");
const fs = require("fs");
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

app.post('/analyze', upload.single('dataset'), (req, res) => {
    if (req.file) {
        console.log("File recieved")
        const filePath = req.file.path
        const pythonProcess = spawn("python", [
            "../Pipeline/rfm.py",
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
        const pythonProcess = spawn("python", [
            "../Pipeline/rfm.py",
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




app.listen(3000, () => {
    console.log("Listening on port 3000")
})
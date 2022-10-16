import express from express
const app = express()
const port = process.env.PORT || 8000

app.get('/status', (req, res) => {
    res.sendStatus(200)
})

app.listen(port, () => console.log("Server started successfully on port " + port))
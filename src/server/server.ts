import express from "express";
import history from "connect-history-api-fallback";
const app = express();

app.get('/api/', (req, res) => {
    res.send("data");
})

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
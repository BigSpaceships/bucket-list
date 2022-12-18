import express from "express";
import bodyParser from "body-parser";

import { routes } from "./router";

const app = express();
app.use(bodyParser.json());
routes(app);


const port = 3000;

app.listen(port, "127.0.0.1", () => {
    console.log(`Example app listening on port ${port}!`);
})
import express from "express";
import history from "connect-history-api-fallback";
const app = express();

const staticFileMiddleware = express.static(__dirname);
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

const port = 5555;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
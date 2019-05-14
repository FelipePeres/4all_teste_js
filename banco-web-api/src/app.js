const http = require("http");
const express = require("express");
const cors = require('cors');
const status = require("http-status");
const clientesRoute = require("./routes/clientes");
const cartoesRoute = require("./routes/cartoes");
const contatosRoute = require("./routes/contatos");
const transferenciasRoute = require("./routes/transferencias");

const sequelize = require("./database/database");

const app = express();

//node .

app.use(cors());

app.use(express.json());

app.use("/api", clientesRoute);
app.use("/api", cartoesRoute);
app.use("/api", contatosRoute);
app.use("/api", transferenciasRoute);

app.use((request, response, next) => {
  response.status(status.NOT_FOUND).send();
});

app.use((error, request, response, next) => {
  response.status(status.INTERNAL_SERVER_ERROR).json({ error });
});

sequelize.sync({ force: false }).then(() => {

  const port = process.env.PORT || 3001;

  app.set("port", port);

  const server = http.createServer(app);

  server.listen(port);
});

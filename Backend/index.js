const express = require('express');
const app = express();
var server = require('http').Server(app);
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const whitelist = [
  'http://localhost:8081',
  'http://localhost:8080',
  'http://localhost:8083'
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

app.use(express.json());
// ***************** C O N T R O L L E R S ***************** //
const toolbooxController = require('./controllers/ToolBox/index')


// ********************* R O U T I N G ********************* //
app.get('/', (req, res) => res.status(200).send({ text: 'ToolBox is alive!' }));
app.get('/text/:text', (req, res) => toolbooxController.text(req, res));

let serverTest = app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
module.exports = serverTest
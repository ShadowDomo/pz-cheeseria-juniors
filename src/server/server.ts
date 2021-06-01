import express = require('express');
import apiRouter from './routes'; 
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static('public'));
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
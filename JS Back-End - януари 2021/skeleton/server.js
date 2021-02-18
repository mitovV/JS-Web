const express = require("express");
const routes = require('./routes');
const { PORT } = require('./config/config');
const errorHandler = require('./middlewares/errorHandler');


const app = express();

require('./config/mongoose');
require('./config/express')(app);

app.use(routes);
app.use(errorHandler);

app.listen(PORT, console.log.bind(console, `Server is lisening on port ${PORT}`));
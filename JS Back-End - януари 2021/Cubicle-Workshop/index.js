const express = require('express');
const app = express();
const config = require('./config/config');
const routes = require('./routes');

require('./config/express')(app);
require('./config/mongoose')(app);

app.use(routes);



app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));
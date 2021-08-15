const express = require('express');
const path = require('path');

const app = express();

const indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(indexRoutes);

app.use(express.static(path.join(__dirname, "css")));

app.listen(3000, () => {
  console.log("App launched on localhost:3000");
});
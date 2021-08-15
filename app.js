const express = require('express');
const path = require('path');

const app = express();

const indexRoutes = require('./routes/index');

const ignoreFavicon = require('./utils/helperFunctions');

app.set('view engine', 'ejs');
app.set('views', 'views');

//Didn't know which favicon to pick so decided to get rid of the console error that was bugging me :O
app.use(ignoreFavicon);
app.use(indexRoutes);

app.use(express.static(path.join(__dirname, "css")));

app.listen(3000, () => {
  console.log("App launched on localhost:3000");
});
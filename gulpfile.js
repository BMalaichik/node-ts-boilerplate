const fs = require("fs");
const _ = require("lodash");

const path = "./built/tasks";

_(fs.readdirSync(path))
     .map(file => file.split(".")[0])
     .forEach(file => {
          let Task = require(`${path}/${file}`).default;
          new Task();
     });

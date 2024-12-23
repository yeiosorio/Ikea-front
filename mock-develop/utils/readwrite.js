const fs = require("fs");
const path = require("path");

const getFile = async (filePath) => {
  return await fs.readFileSync(filePath, 'utf8');
};

const writeFile = async (filePath, config) => {
  return await fs.writeFile(filePath, config, 'utf8', (err)=>{
    console.log(err);
  });
};

module.exports = {
  getFile,
  writeFile
};
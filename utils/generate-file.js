 // Summary of file: generate-file.js
        // 1.  require for fs
        // 2.  writeFile function w/promise (md-template > dist/README.md)
        // 3.  module exports, writefile 

//-- require
const fs = require('fs');

//-- create a promise, produces the README.md file, writes to the root (you can change this output location)
const writeFile = fileContent => {
  return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, err => {  // to output to the /dist dir
        //   fs.writeFile('./README.md', fileContent, err => {  // to output to your repo root
         if (err) {
                  reject(err);
                  return;
          }        
          resolve({
                  ok: true,
                  message: 'The README.md file has been created in your root folder.'
          });
  });
  });
};

//-- export
module.exports = writeFile;
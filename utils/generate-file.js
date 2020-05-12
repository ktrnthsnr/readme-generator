// ------------------------------------------------------------- //

// gitprofile:  ktrnthsnr               date: may 10th 2020
// assignment/ref:  module 9 Node.js    repo: readme-generator
// ------------------------------------------------------------- //
// this file:   generate-file.js     
// page contains:
// ------------------------------------------------------------- //
        // 1. the require
        //     a. require for fs
        // ------------------------------------------------------ //
        // 2. the functions  
        //     a. writeFile function w/promise ( md-template HTML   >   dist/index.html)
        // ------------------------------------------------------ //
        // 3. module exports
        //     a. writefile 
        //     

// ------------------------------------------------------------- //

//-- require
const fs = require('fs');

//-- create a promise and write a file
const writeFile = fileContent => {
  return new Promise((resolve, reject) => {
  fs.writeFile('./dist/README.md', fileContent, err => {
         if (err) {
                  reject(err);
                  return;
          }        
          resolve({
                  ok: true,
                  message: 'The README.md file has been created in the /dist folder.'
          });
  });
  });
};

//-- export
module.exports = writeFile;
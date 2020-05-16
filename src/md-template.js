
// ------------------------------------------------------------- //

// gitprofile:  ktrnthsnr               date: may 11th 2020
// assignment/ref:  module 9 Node.js    repo: readme-generator

// ------------------------------------------------------------- //
// this file:   md-template.js
// page contains:
// ------------------------------------------------------------- //
        // 1. the functions 
        //     a. generateContribute() to create MD Contribute section
        //     b. generateRepos() to create MD repos section
        // ------------------------------------------------------ //
        // 2. module export & function
        //     a. templateData array > to export the MD framework template
        //            1) nested with generateContribute() array into an MD template literal
        //            2) nested with generateRepos() array into an MD template literal

// ----------------------------------------------------------------------------------------------- //

// ----   MD template - contribute detail, Contribute section --------  //

const generateContribute = contributeText => {
    if (!contributeText) {
return '';
    }
    return `
Please follow these steps to contribute: ${contributeText}
    `;
};
   

// ------ MD template - project details --- create generateRepos function 

const generateRepos = projectsArr => {
return `
##### ---- Repository Project Details ----  ${projectsArr
    .filter(({ feature }) => feature)
    // .map(({ name, description, languages, link }) => {
    .map(({ license, description, installation }) => {
    return `

## Licenses   
${license.join(', ')}

## Project Description 
${description}

## Installation instructions: 
${installation}

`;
  })
 .join('')}

${projectsArr
.filter(({ feature }) => !feature)
// .map(({ name, description, languages, link }) => {
.map(({ description, installation, usage, reference, test, lang,license }) => {
return `## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Reference](#reference)
* [License](#license)

## Description
${description}

## Installation
${installation}

## Usage
${usage}

## Reference
${reference}

## Testing
${test}

## Technology
${lang}

## License
${license}


`;
})
.join('')}
`;
};

// -- MD template, basic user info for README.md w/ Contribute and repos nested in MD  -----  //

module.exports = templateData => {
    const { repos, contribute, ...header } = templateData;
return `# Repository: ${header.repo}

## Questions?

* Contact info/email: ${header.name}
* GitHub URL: https://github.com/${header.github}

* Instructions on how to contribute:
${generateContribute(contribute)}

${generateRepos(repos)}

## Contribution
${header.github}

### ©️${new Date().getFullYear()} ${header.github}
`;
};

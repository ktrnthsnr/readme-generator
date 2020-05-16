// ------------------------------------------------------------- //

// gitprofile:  ktrnthsnr               date: may 11th 2020
// assignment/ref:  module 9 Node.js    repo: readme-generator

// ------------------------------------------------------------- //
// this file:   apps.js
// outputs:     a README.md file to the /dist folder (or you can update to push to the /dist folder)
// usage:       run in terminal: $ node index.js
// page contains:
// ------------------------------------------------------------- //
        // 1. the requires
        //     a. require for npm inquirer 
        //     b. require for generateMDTemplate   >  md-template.js
        //     c. require for writeFile   >  generate-file.js
        // ------------------------------------------------------ //
        // 2. the functions    
        //     a. promptInput() with questions
        //     b. promptRepo() with questions
        // ------------------------------------------------------ //
        // 3. the inits
        //     a. promptInput     
        //     b.    w/ nested promptRepo
        //                      > returns generateMDTemplate()   >  creates MD template
        //                      > writeFile >  moves >  READ.md to /dist folder

// ------------------------------------------------------------- //

// --- require ---- //
const inquirer = require('inquirer');
const generateMDTemplate = require('./src/md-template.js');
const writeFile = require('./utils/generate-file.js');


// -- user questions through prompts

const promptInput = () => {
    return inquirer.prompt([

    //-- repo title question
    {
        type: 'input',
        name: 'repo',
        message: 'What is the repo name?',
        //added validation
        validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please enter the repo name.');
            return false;
        }
        }
    },    

            //-- email question
            {
                type: 'input',
                name: 'name', 
                message: 'What is your email address?',
                //added validation
                validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your email address.');
                    return false;
                }
                }
            },                                        
            //-- github username question
            {
                type: 'input',
                name: 'github',
                message: 'What is your GitHub username?',
                validate: nameInput => {
                    if (nameInput) {
                    return true;
                    } else {
                    console.log('Please enter your GitHub username.');
                    return false;
                    }
                }
            },
            //-- contribute question
            {
                type: 'confirm',
                name: 'confirmContribute',
                message: 'Would you like to include contribute instructions?',
                default: true
            },
            {
                type: 'input',
                name: 'contribute',
                message: 'Please include instructions on how to contribute:',
                when: ({ confirmContribute }) => confirmContribute
            }
            ]);
};


// -- other user questions - project details
        //-- wrapped the inquirer.prompt() inside a promptRepo function, function expression with an array

const promptRepo = portfolioData => {
            if (!portfolioData.repos) {
                portfolioData.repos = [];
            }
                console.log(`
                __________________________

                 Add other project details:
                 __________________________
                `);
                    return inquirer.prompt([
                            // -- description of repo project question
                            {
                                type: 'input',
                                name: 'description',
                                message: 'Description of the repo project:',
                                //--validation
                                validate: nameInput => {
                                    if (nameInput) {
                                    return true;
                                    } else {
                                    console.log('Please enter a repo project description.');
                                    return false;
                                    }
                                }
                            },
                            // -- installation question
                            {
                                type: 'input',
                                name: 'installation',
                                message: 'Please enter any installation instructions:',
                                //--validation
                                validate: nameInput => {
                                    if (nameInput) {
                                    return true;
                                    } else {
                                    console.log('Enter installation instructions.');
                                    return false;
                                    }
                                }
                            },
                            // -- usage question
                            {
                                type: 'input',
                                name: 'usage',
                                message: 'Provide usage instructions or how to start the application:',
                                //--validation
                                validate: nameInput => {
                                    if (nameInput) {
                                    return true;
                                    } else {
                                    console.log('Please enter usage instructions:');
                                    return false;
                                    }
                                }
                            },
                             // -- reference question                            
                            {
                                type: 'input',
                                name: 'reference',
                                message: 'Provide any references here:',
                                //--validation
                                validate: nameInput => {
                                    if (nameInput) {
                                    return true;
                                    } else {
                                    console.log('Please enter references if any:');
                                    return false;
                                    }
                                }
                            },
                            // -- how to test related question
                            {
                                type: 'input',
                                name: 'test',
                                message: 'Provide testing instructions:',
                                //--validation
                                validate: nameInput => {
                                    if (nameInput) {
                                    return true;
                                    } else {
                                    console.log('Please enter testing instructions:');
                                    return false;
                                    }
                                }
                            },
                            // -- tech languages used for project
                            {
                                type: 'checkbox',
                                name: 'lang',
                                message: 'Built with? (Spacebar to select, arrow down, Enter afterwards.)',
                                choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
                            },
                            // -- choose license type question
                            {
                                type: 'list',
                                name: 'license',
                                //update for license & badge
                                message: 'What license would you like to use? (Spacebar to select, Enter afterwards.)',
                                choices: ['MIT License', 'GNU GPLv3', 'Other']
                            }                           
                    ])
                            .then(projectData => {
                                portfolioData.repos.push(projectData);
                                if (projectData.confirmAddProject) {
                                return promptRepo(portfolioData);
                                } else {
                                return portfolioData;
                                }
                            });                
        };    

 // initialize the prompt functions, promptRep is nested within the promptInput

                promptInput()
                .then(promptRepo)
                .then(portfolioData => {
                return generateMDTemplate(portfolioData);
                })
                .then(pageHTML => {
                return writeFile(pageHTML);
                })
                .then(writeFileResponse => {
                console.log(writeFileResponse);
                })
                .catch(err => {
                console.log(err);
                });
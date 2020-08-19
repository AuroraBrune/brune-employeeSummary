const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
async function init() {
    const teamMembers = [];
    await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is employee name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is employee id number?"
        },
        {
            type: "email",
            name: "email",
            message: "What is employee email address?"
        },
        {
            type: "list",
            name: "role",
            message: "What is employee role",
            choices: ["manager", "engineer", "intern"]
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is manager's office number?",
            when: (answers) => answers.role === "manager"
        },
        {
            type: "input",
            name: "github",
            message: "What is engineer's GitHub name?",
            when: (answers) => answers.role === "engineer"
        },
        {
            type: "input",
            name: "school",
            message: "What is intern's school?",
            when: (answers) => answers.role === "intern"
        }

    ]).then(response => {
        try {
            name = response.name;
            id = response.id;
            email = response.email;
            role = response.role;

            switch (role) {
                case "manager": officeNumber = response.officeNumber;
                    const manager = new Manager(
                        name,
                        id,
                        email,
                        response.officeNumber
                    );
                    teamMembers.push(manager);
                    console.log(manager);
                    break;
                case "engineer": github = response.github;
                    const engineer = new Engineer(
                        name,
                        id,
                        email,
                        response.github
                    );
                    teamMembers.push(engineer);
                    console.log(engineer);
                    break;
                case "intern": school = response.school;
                    const intern = new Intern(
                        name,
                        id,
                        email,
                        response.school
                    );
                    teamMembers.push(intern);
                    console.log(intern);
                    break;
            }

        }
        catch (err) {
            console.log(err);
        }
        newEmployees();
    })

    function newEmployees() {
        inquirer.prompt("Are there any more employees to add?")
        if (true) {
            promptUser();
        }
        renderhtml();
    }
    console.log(teamMembers);

}
function renderhtml() {

    promptUser();
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");


}
init();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

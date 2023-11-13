
const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = require("./db/connection");


function start() {
  //present initial list of menu options

  inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "What do you want to do?",
      choices: [
        "view all employees", "view all departments", "view all roles", "add new role",
        "add new employee", "add a new department", "update employee role"
      ]



    }
  ]).then(function (answer) {
    if (answer.options === "view all employees") {
      viewAllEmployees()
    } else if (answer.options === "view all departments") {
      getAllDepartments()
    } else if (answer.options === "view all roles") {
      getAllRoles()
    } else if (answer.options === "add new role") {
      addNewRole()

    } else if (answer.options === "add a new department") {
      addNewDepartment()
    } else if (answer.options === "add new employee") {
      addNewEmployee()
    }
    else {
      UpdateEmployeeRole()
    }
  }

  )
}

function viewAllEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
    start()
  });

}


function getAllDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    start()
  });
}
function getAllRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
    start()
  });

}
function addNewDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: " What is the name of the new department?"

    }
  ]).then(function (answer) {
    db.query('INSERT INTO department(name) VALUES(?)', answer.name, function (err, results) {

      console.table(results);

      start()
    })
  })
}
function addNewEmployee() {
  db.query("SELECT * FROM role", function (err, res) {
    const roleId = res.map(role => {
      return {
        value: role.id,
        name: role.title
      }
    })
    db.query("SELECT * FROM employee", function (err, res) {
      const managerId = res.map(dep => {
        return {
          value: dep.id,
          name: dep.fname + " " + dep.lname
        }
      })
      inquirer.prompt([
        {
          type: "input",
          name: "fname",
          message: " What is the first name of the new employee?"

        },
        {
          type: "input",
          name: "lname",
          message: " What is the last name of the new employee?"
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the employee title?",
          choices: roleId

        },
        {
          type: "list",
          name: "manager_id",
          message: "What is the manger id for this employee?",
          choices: managerId

        }

      ]).then(function (answer) {
        db.query('INSERT INTO employee (fname, lname, role_id, manager_id) VALUES(?, ?, ?, ?)', [answer.fname, answer.lname, answer.role_id, answer.manager_id], function (err, results) {
          console.table(results);
          start()
        })
      })
    })
  })
}
function addNewRole() {
  db.query("SELECT * FROM department", function (err, res) {
    const depId = res.map(dep => {
      return {
        value: dep.id,
        name: dep.name
      }
    })


    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: " What is the title of the new role?"

      },
      {
        type: "input",
        name: "salary",
        message: " how much is the salary for this new role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does this new role blong to?",
        choices: depId

      },


    ]).then(function (answer) {
      db.query('INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)', [answer.title, answer.salary, answer.department_id], function (err, results) {
        console.table(results);
        start()
      })
    })
  })
}
function UpdateEmployeeRole() {
  db.query("SELECT * FROM role", function (err, res) {
    const roleId = res.map(role => {
      return {
        value: role.id,
        name: role.title
      }
    })
    db.query("SELECT * FROM employee", function (err, res) {
      const managerId = res.map(dep => {
        return {
          value: dep.id,
          name: dep.fname + " " + dep.lname
        }
      })
      inquirer.prompt([

        {
          type: "list",
          name: "id",
          message: " Which employee do you need to update?",
          choices: managerId
        },
        {
          type: "list",
          name: "role_id",
          message: " What is the new role_id for the employee?",
          choices: roleId

        }


      ]).then(function (answer) {
        db.query('UPDATE employee SET role_id= ? WHERE id= (?)', [answer.role_id, answer.id], function (err, results) {
          console.table(results);
          start()
        })
      })
    })
  })
}


start()
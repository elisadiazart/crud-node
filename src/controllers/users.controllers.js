const path = require('path');
const usersFile = path.resolve(__dirname, '../../data/users.json');
const fs = require('fs')

const controller = {}

controller.allUsers = (req, res) => {
    fs.readFile(usersFile, (err, data) => {
        if (err) throw err

        const jsonData = JSON.parse(data)

        res.send(jsonData)
    })
}

controller.userById = (req, res) => {
    fs.readFile(usersFile, (err, data) => {
        if (err) throw err
        const jsonData = JSON.parse(data)
        const user = jsonData.find(user => user.userId === req.params.id)
        res.send(user)
    })
}

module.exports = controller;
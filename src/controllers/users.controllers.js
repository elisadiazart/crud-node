const path = require('path');
const usersFile = path.resolve(__dirname, '../../data/users.json');
const fs = require('fs');
const { v4 } = require('uuid');

const controller = {}

controller.allUsers = (req, res) => {
    fs.readFile(usersFile, (err, data) => {
        if (err) res.status(500).send('Error al leer el archivo de usurios')

        const jsonData = JSON.parse(data)

        res.send(jsonData)
    })
}

controller.userById = (req, res) => {
    fs.readFile(usersFile, (err, data) => {
        if (err) res.status(500).send('Error al leer el archivo de usurios')
        const jsonData = JSON.parse(data)
        const user = jsonData.find(user =>{
            return user.userId === req.params.id})
        res.send(user)
    })
}

controller.createUser = (req, res) => {
    fs.readFile('./data/users.json', (err, data)=> {
        if (err) throw err;
        const newData = req.body

        const jsonData = JSON.parse(data)

        const userCheck = jsonData.some(user => user.email === newData.email)

        if(userCheck){
            return res.status(409).send('Usuario Duplicado')
        }

        newData.id = v4()

        jsonData.push(newData)

    fs.writeFile(usersFile, JSON.stringify(jsonData), err=> {
        if(err) return res.status(500).send('Error al guardar el usuario')
        res.end()
    })
})}

controller.deleteUser = (req, res) => {
    fs.readFile('./data/users.json', (err, data)=> {
        if (err) throw err;
        const newData = req.params.id

        const jsonData = JSON.parse(data)

        const userIndex = jsonData.findIndex(user => user.id === newData)
        
        if(userIndex === -1){
            return res.status(409).send('Ese usuario no existe')
        }

        jsonData.splice(userIndex, 1)

        fs.writeFile(usersFile, JSON.stringify(jsonData), err=> {
            if(err) return res.status(500).send('Error al guardar el usuario')
            res.end()
        })

    })
}


module.exports = controller;
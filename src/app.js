const express = require('express');
const app = express();
const path = require('path');
const usersFile = path.resolve(__dirname, '../data/users.json');

const fs = require('fs')

app.get('/', (req, res) => {
    fs.readFile('./data/users.json', (err, data) => {
        if (err) throw err

        const jsonData = JSON.parse(data)

        res.send(jsonData)
    })
})

app.listen(3000, () => console.log('Servidor en ejecución en el puerto 3000'));

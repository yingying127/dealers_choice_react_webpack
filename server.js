const { syncAndSeed, models: { Pasta} } = require('./db')

const express = require('express');
const app = express();
const faker = require('faker');
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/pasta', async(req, res, next) => {
    try {
        const city = faker.address.city()
        res.status(201).send(await city)
    }
    catch(ex) {
        next(ex)
    }
})

app.get('/api/pasta', async(req, res, next) => {
    try {
        res.send(await Pasta.findAll())
    }
    catch(ex) {
        next(ex)
    }
})

const init = async() => {
    try {
        await syncAndSeed();

        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port ${port}`))
    }
    catch(ex) {
        console.log(ex)
    }
}

init()
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
        const name = `Try the pasta here: ${city}!`
        const pasta = await Pasta.create({ name })
        res.send(await pasta)
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
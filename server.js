const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/pasta_db');

const Pasta = sequelize.define('pasta', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Pasta.createName = (name) => Pasta.create({ name })

const express = require('express');
const app = express();

const faker = require('faker');

app.post('/api/pasta', async(req, res, next) => {
    try {
        const city = faker.address.city()
        res.send(await city)
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

const syncAndSeed = async() => {
    try {
        await sequelize.sync({ force: true });

        const [ziti, fusilli, spaghetti, ravioli, tortellini] = await Promise.all(
            ['Baked Ziti', 'Fusili alla Caprese', 'Spaghetti Cacio e Pepe', 'Ravioli ai Piselli', 'Tortellini in Brodo'].map(Pasta.createName)
        )

        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port ${port}`))
    }
    catch(ex) {
        console.log(ex)
    }
}

syncAndSeed()
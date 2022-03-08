const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/pasta_db');

const Pasta = sequelize.define('pasta', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Pasta.createName = (name) => Pasta.create({ name })

const syncAndSeed = async() => {
    try {
        await sequelize.sync({ force: true });

        const [ziti, fusilli, spaghetti, ravioli, tortellini] = await Promise.all(
            ['Baked Ziti', 'Fusili alla Caprese', 'Spaghetti Cacio e Pepe', 'Ravioli ai Piselli', 'Tortellini in Brodo'].map(Pasta.createName)
        )        
    }
    catch(ex) {
        console.log(ex)
    }
}

syncAndSeed()
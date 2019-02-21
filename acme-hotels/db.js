const Sequelize = require('sequelize')
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/acme_hotels'
const orm = new Sequelize(DATABASE_URL, {logging:false})

const User = orm.define('user',
{name: Sequelize.STRING})

const Hotel = orm.define('hotel',
{name: Sequelize.STRING})

const Stay = orm.define('stay',
{days: Sequelize.INTEGER})

User.belongsToMany(Hotel, {through: 'user_hotel'})
Hotel.belongsToMany(User, {through: 'user_hotel'})

Stay.belongsToMany(Hotel, {through: 'user_hotel_stay'})
Stay.belongsToMany(User, {through: 'user_hotel_stay'})

function syncAndSeed(){
    orm.sync({force: true})
    .then(()=>{
        console.log('ORM connected!')
        return Promise.all([User.create({name:'Moe'}), 
                            User.create({name:'Larry'}),
                            User.create({name:'Curly'})])
    })
    .then((users)=>{
        return Promise.all(users.map((user)=>{
            user.addHotel({name:'Sheraton'})
            user.addHotel({name:'Hilton'})
        }))
    })
    .catch((error)=>
        console.log(err)
    )

}


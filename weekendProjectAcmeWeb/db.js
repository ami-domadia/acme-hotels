const {Client} = require("pg");
postgresUrl='postgres://localhost/acme_users_the_db';

const SEED = `
  DROP TABLE IF EXISTS things;
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) unique
  );
  CREATE TABLE things(
    id SERIAL PRIMARY KEY,
    name varchar(100),
    user_id integer references users(id)
  );
  INSERT INTO users(email) values('moe@example.com');
  INSERT INTO users(email) values('larry@example.com');
  INSERT INTO users(email) values('curly@example.com');
`;


let client = new Client(postgresUrl);

function getUsers(){
    client.connect()
    .then(console.log('Connected to the database successfully.'))
    .catch(console.log('Cannot connect to the database!'));

    let result=[];
    let sql=`select * from users;`;
    
    return client.query()
    .then(result=>result.rows)
    .catch('Query did not run!')
    .then(client.end());
}

function getUser(id){
    client.connect()
    .then(console.log('Connected to the database successfully.'))
    .catch(console.log('Cannot connect to the database!'));

    let result=[];
    let sql=`select * from users where id=$1;`;

    client.query(sql, [id])
    .then(result=>result.rows[0])
    .catch('Query did not run!');
    
    client.end()
    .catch(console.log('Cannot disconnect from the database!'));

    return result;
}

function sync(){
    client.connect()
    .then(console.log('Connected to the database successfully.'))
    .catch(console.log('Cannot connect to the database!'));

    client.query(SEED)
    .catch('Could not seed database!');
}

let db={sync, getUser, getUsers};
module.exports=db;
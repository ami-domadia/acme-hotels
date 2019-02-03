//http://lh5.ggpht.com/-H8krcdXX0OY/TkKh5sju8LI/AAAAAAAAAGs/Vkyx5Ch2j6g/s9000/logoA2.gif

const express=require('express');
const morgan=require('morgan');
const db=require('./db');
const app=express();
app.use(morgan('dev'));

const renderPage = (user, users)=> {
    return `
        <html>
        <head>
          <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' />
        </head>
        <body>
          <div class='container'>
          <ul class='nav nav-tabs'>
            ${ 
              users.map( user=> {
              return `
                <li class='nav-item'>
                  <a href='/users/${user.id}' class='nav-link'>
                  ${ user.email }
                  </a>
                </li>
              `;
              }).join('')
            }
          </ul>
          <div>
            you chose ${ user.email }
          </div>
          </div>
        </body>
        </html>
      `;
  }
  
  app.use((req, res, next)=> {
    db.getUsers()
      .then( users => {
        req.users = users;
        next();
      })
      .catch(next);
  });
  
  app.get('/', (req, res, next)=> {
    const user = req.users[0];
    res.redirect(`/users/${user.id}`);
  });
  
  app.get('/users/:id', (req, res, next)=> {
    db.getUser(req.params.id)
      .then( user => res.send(renderPage(user, req.users)))
      .catch(next);
  });

  const PORT = 1338;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
const app = require('express')();
const fs = require('fs');
const bodyParser = require('body-parser')();

app.use('/', bodyParser);

app.set('views', 'views');
app.set('view engine', 'pug');

// loading file that saves user information

fs.readFile('./users.json', 'utf-8', (err, data) => {
		if (err) {
			console.log(`Beep boop, error occurred: ${err}`);
			throw err;
		}
		var parse = JSON.parse(data);

// ROUTE 1: show all users 

	app.get('/', (request, response) => {
			response.render('index', { 
				users: parse
			});
		});

// ROUTE 2: search bar to look for matches in user database

	app.get('/search', (request, response) => {
		response.render('search');
	});

// ROUTE 3: display matching users through comparison

	app.post('/search', (request, response) => {
		console.log(request.body.name);
			for (var i = 0; i < parse.length; i++) {
				if (request.body.name === parse[i].firstname || request.body.name === parse[i].lastname || request.body.name === parse[i].firstname + " " + parse[i].lastname){
					response.send('User found!');	
				} else {
					response.send('Not a user.')
				}
			}
		});

// ROUTE 4: created 3 forms for user input to create account

	app.get('/createaccount', (request, response) => {
		response.render('createaccount');
	});

// ROUTE 5: convert user input into object and push into json file

	app.post('/createaccount', (request, response) => {
		console.log(request.body.firstname + " " + request.body.lastname + " " + request.body.email)
		var newuser = { firstname: request.body.firstname, lastname: request.body.lastname, email: request.body.email };
		
		parse.push(newuser);
		var newjson = JSON.stringify(parse);

		fs.writeFile('./users.json', newjson, 'utf-8', (err) => {
			if (err) {
				console.log(`Beep boop, error occurred: ${err}`);
			throw err;
			} else {
				console.log('Database updated!');
			}
		});
		response.redirect('/');
	});
});

const listener = app.listen(3000, () => {
	console.log('The server has started at port:', listener.address().port)
});
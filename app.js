const app = require('express')();
const fs = require('fs');
const bodyParser = require('body-parser')();

app.use('/', bodyParser);

app.set('views', 'views');
app.set('view engine', 'pug');

// ROUTE 1: show all users 

	app.get('/', (request, response) => {
		fs.readFile('./users.json', 'utf-8', (err, data) => {	// loading file that saves user information
		if (err) {
			console.log(`Beep boop, error occurred: ${err}`);
			throw err;
		}
		var parse = JSON.parse(data);		//parsing the JSON file into an object to work with
				response.render('index', { 
					users: parse  				//assign all the user info to the pug variables
				});
			});
		});

// ROUTE 2: search bar to look for matches in user database

	app.get('/search', (request, response) => {
		response.render('search');
	});

// ROUTE 3: display matching users through comparison

	app.post('/search', (request, response) => {
		fs.readFile('./users.json', 'utf-8', (err, data) => {	// loading file that saves user information
		var parse = JSON.parse(data);

		console.log(request.body.name);
		var matchedUser = { firstname: 'nonexistent', lastname: 'nonexistent', email: 'nonexistent'};		// default assignment
			for (var i = 0; i < parse.length; i++) {
				if (request.body.name === parse[i].firstname || request.body.name === parse[i].lastname || request.body.name === parse[i].firstname + " " + parse[i].lastname){
					matchedUser = parse[i]; 	//reassigned var to display user info according to index
				}
			}
			response.render('displayuser', {
				user: matchedUser
			});
		});
	});

// ROUTE 4: created 3 forms for user input to create account

	app.get('/createaccount', (request, response) => {
		response.render('createaccount');
	});

// ROUTE 5: convert user input into object and push into json file

	app.post('/createaccount', (request, response) => {
		fs.readFile('./users.json', 'utf-8', (err, data) => {	// loading file that saves user information
			if (err) {
				console.log(`Beep boop, error occurred: ${err}`);
				throw err;
			}

		var parse = JSON.parse(data);		//parsing the JSON file into an object to work with

		console.log(request.body.firstname + " " + request.body.lastname + " " + request.body.email);
		var newUser = { firstname: request.body.firstname, lastname: request.body.lastname, email: request.body.email };
		
		parse.push(newUser);			//added new user information to the parse object
		var newjson = JSON.stringify(parse);	//making parse JSON ready

		fs.writeFile('./users.json', newjson, 'utf-8', (err) => {
				if (err) {
					console.log(`Beep boop, error occurred: ${err}`);
				throw err;
				} else {
					console.log('Database updated!');
				}
			});
		});
		response.redirect('/');
	});

const listener = app.listen(3000, () => {
	console.log('The server has started at port:', listener.address().port)
});
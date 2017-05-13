const app = require('express')();
const fs = require('fs');
const bodyparser = require('body-parser');

app.set('views', 'views');
app.set('view engine', 'pug');

app.get('/', (request, response) => {
	fs.readFile('./users.json', 'utf-8', (err, data) => {
		if (err) {
			console.log(`Beep boop, error occurred: ${err}`);
			throw err;
		}
		var parse = JSON.parse(data);
		response.render('index', { 
			users: parse
		});
	});
});

app.get('/search', (request, response) => {
	response.render('search');
	response.send('Everything OK!');
});

app.post('/users', (request, response) => {
	response.render('users');
});

app.get('/createuser', (request, response) => {
	response.render('createuser');
});

app.post('/adduser', (request, response) => {
	response.render('adduser');
});

const listener = app.listen(3000, () => {
	console.log('The server has started at port:', listener.address().port)
});
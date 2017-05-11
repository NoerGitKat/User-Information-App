const express = require('express');
const app = express();

app.set('views', 'public');
app.set('view engine', 'pug');

/*app.use ('/', express.static('public'));*/

app.get('/', (request, response) => {
	response.render('index');
});

const listener = app.listen(3000, () => {
	console.log('The server has started at port:', listener.address().port)
});
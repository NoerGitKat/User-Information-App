const express = require('express');
const app = express();

// respond with 'This is working!' when a GET request is made
app.get('/', (request, response) => {
	response.send('This is working!');
})

app.post('/path/to/file', {param1: 'value1'}, function(data, textStatus, xhr) {
	/*optional stuff to do after success */
});
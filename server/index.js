const express = require('express');
const app = express();

app.use(express.static(__dirname + '../../public'));

app.get('/dates', (data) => {
    //this is an example route to test 
})

app.listen(8888, () => {
    console.log('server listening on port 8888!')
})
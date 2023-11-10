const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

//routes go here


app.get('/', (req, res) =>{
    res.send('Hello');
});


//connection information goes here

app.listen(process.env.PORT || 3000, () =>{
    console.log('Server listening at port ' + (process.env.PORT))
})
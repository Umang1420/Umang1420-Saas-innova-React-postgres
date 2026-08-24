import express from 'express';

const app = express();
const port = 5000;

// const myLogger = function (req, res, next) {
//   console.log('LOGGED');
//   next();
// };

// app.use(myLogger)
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to my API');
});


app.get('/status', (req, res) => {
    res.json({ status: "Active", uptime: "100%" });
});


app.get('/user/:name', function(req, res) {
    const userName = req.params.name;
    res.json({ message: `Hello ${userName}` });
});

app.post('/', (req  , res) => {
  res.send('Got a POST request');
}); 

app.put('/', (req  , res) => {
  res.send('Got a PUT request');
});

app.get('/user', (req, res) => {
    res.json({ message: "Please provide a username, like /user/John" });
});

app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user');
});


app.listen(port, () => {
    console.log(`Done, Server is running on http://localhost:${port}`);
});     
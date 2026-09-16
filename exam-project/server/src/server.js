import http from 'node:http';
const options = {
  host: 'localhost',
  port : 5000
};
const req = http.get(options);
req.end();
req.once('response', (res) => {
  console.log("server is running"); 
});

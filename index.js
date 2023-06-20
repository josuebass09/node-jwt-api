const http = require('http');
const app = require('./app');
const server = http.createServer(app);

// eslint-disable-next-line no-undef
const { API_PORT } = process.env;
// eslint-disable-next-line no-undef
const port = process.env.PORT || API_PORT;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

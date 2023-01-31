// Hedgehog HTML Info Website that has been improved by JavaScript. There is a Sync page. Can be accessed by typing localhost:3000/sync.
// Project by: Darla Ward
// Completed on: January 31, 2023

const http = require('http');
const routes = require('./routes.js');
const server = http.createServer((request, response) => {
    let path = "./pages/";
    switch(request.url) {
        case '/':
            path += "index.html";
            response.statusCode = 200;
            routes.indexPage(path, request.url, response);
            break;
        case '/index':
            path += "index.html";
            response.statusCode = 200;
            routes.indexPage(path, request.url, response);
            break;
        case '/genus':
            path += "genus.html";
            response.statusCode = 200;
            routes.genusPage(path, request.url, response);
            break;
        case '/about':
            path += "about.html";
            response.statusCode = 200;
            routes.aboutPage(path, request.url, response);
            break;
        case '/description':
            path += "description.html";
            response.statusCode = 200;
            routes.descriptionPage(path, request.url, response);
            break;
        case '/domestication':
            path += "domestication.html"
            response.statusCode = 200;
            routes.domesticationPage(path, request.url, response);
            break;
        case '/sync':
            routes.syncPage('./views/', 'sync file mgmt', response);
            break;
        default:
            path += "404.html";
            response.statusCode = 404;
            routes.fourOfourPage(path, request.url, response);
            break;
    }
});

server.listen(3000, 'localhost', () => {
    console.log('LISTENING ON PORT 3000.')
});

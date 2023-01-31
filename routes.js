const fs = require('fs');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter();
const logEvents = require('./logEvents');

myEmitter.addListener('route', (event, level, msg) => {
    const d = new Date();
    console.log(d.toLocaleString() + ' * ' + level.toUpperCase() + ' * ' + msg);
    logEvents(event, level.toUpperCase() , msg);
});

function indexPage(path, event, response) {
    displayFile(path, response);
    myEmitter.emit('route', event, 'INFO', 'the Home page was visited.');
}

function aboutPage(path, event, response) {
    displayFile(path, response);
    myEmitter.emit('route', event, 'INFO', 'the About page was visited.');
}

function descriptionPage(path, event, response) {
    displayFile(path, response);
    myEmitter.emit('route', event, 'INFO', 'the Description page was visited.');
}

function domesticationPage(path, event, response) {
    displayFile(path, response);
    myEmitter.emit('route', event, 'INFO', 'the Domestication page was visited.');
}

function genusPage(path, event, response) {
    displayFile(path, response);
    myEmitter.emit('route', event, 'INFO', 'the Genus & Species page was visited.');
}

function fourOfourPage(path, event, response) {
    displayFile(path, response);
    myEmitter.emit('route', event, 'ERROR', 'a routing error occured for the ' +  event + ' route.');
}

function syncPage(path, event, response) {
    let readName = path + 'ReadMeFile.txt';
    let readMe = fs.readFileSync(readName, 'utf8')
    myEmitter.emit('route', event, 'success', `${readName} file was successfully read.`);
    response.writeHead(response.statusCode, {'Content-Type': 'text/plain'});
    response.write(`${readName} file was successfully read.`);

    let writeName = path + 'WriteMeFile.txt';
    fs.writeFileSync(writeName, readMe);
    myEmitter.emit('route', event, 'success', `${writeName} file was successfully written.`);
    response.write(`\n${writeName} file was successfully written.`);
    response.end();
}

function displayFile(path, response) {
    fs.readFile(path, function(err, data) {
        if(err) {
            console.log(err);
            response.end();
        } else {
            response.writeHead(response.statusCode, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        };   
    });
};

module.exports = {
    indexPage,
    aboutPage,
    descriptionPage,
    domesticationPage,
    genusPage,
    fourOfourPage,
    syncPage,
}
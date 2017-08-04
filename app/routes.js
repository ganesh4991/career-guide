var path = require("path");
var ejs = require("ejs");

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.get('/', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

    app.post('/jobsearch', function(req, res) {
        queryParmeters = req.body.result.parameters;
        var skill = queryParmeters['tech_skill'];
        var location = queryParmeters['geo-city'];
        res.setHeader('Content-Type', 'application/json');
        var jobUrl = 'http://localhost:8080/indeedresults/'+ skill + '/' + location;
        res.send(JSON.stringify({ 'speech': jobUrl, 'displayText': jobUrl}));
        // res.send(JSON.stringify({ 'speech': 'Its Working', 'displayText': 'test'}));
    });

    app.get('/indeedresults/:skill/:location', function(req, res) {
        var skill = req.params.skill;
        var location = req.params.location;
        console.log('Searching for ' + skill + ' location ' + location);
        res.render('jobsearch', { 'skill' : skill, 'location' : location});
    });
};
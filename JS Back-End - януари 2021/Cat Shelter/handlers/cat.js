const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const breeds = require('../data/breeds');
const cats = require('../data/cats');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if(pathname === '/cats/add-cat' && req.method === 'GET'){

        fs.readFile(`./views/addCat.html`, (err, data) => {
            if(err){
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })
                res.write('Not found');
                res.end();
                console.log(err.message);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(data);
            res.end();
        })
    } else if(pathname === '/cats/add-breed' && req.method === 'GET'){
        fs.readFile(`./views/addBreed.html`, (err, data) => {
            if(err){
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })
                res.write('Not found');
                res.end();
                console.log(err.message);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(data);
            res.end();
        })
    } else{
        return true;
    }
}
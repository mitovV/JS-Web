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
    } else if(pathname === '/cats/add-breed' && req.method === 'POST'){
        let formData = '';

        req.on('data', (data) => {
            formData += data;
        })

        req.on('end', () =>{
            let breedObj = qs.parse(formData);

            fs.readFile('./data/breeds.json', (err, data) => {
                if(err){
                    throw err;
                }

                let breeds = JSON.parse(data);
                breeds.push(breedObj.breed);

                let json = JSON.stringify(breeds);

                fs.writeFile('./data/breeds.json', json, 'utf-8', () => console.log(`Successfully added breed ${breedObj.breed}`))
            })

            res.writeHead(302, {location: '/'});
            res.end();
        })


    } else{
        return true;
    }
}
const url = require('url');
const fs = require('fs');
const mv = require('mv');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds');
const cats = require('../data/cats');
const form = new formidable.IncomingForm();

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

            let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder);

            res.write(modifiedData);
            res.end();
        })
    } else if(pathname === '/cats/add-cat' && req.method === 'POST'){
        form.parse(req, (err, fields, files) => {
           if(err){
               throw err;
           }

           let { name, description, breed } = fields;

           let oldPath = files.upload.path;
           let newPath =  path.normalize(path.join(__dirname, `../content/images/${files.upload.name}`))
           mv(oldPath, newPath, (err) => {
               if(err){
                   throw err;
               }

               console.log('Successfully upload image');
           })

           fs.readFile('./data/cats.json', (err, data) => {
               if(err){
                   throw err;
               }

                let cats = JSON.parse(data);
                cats.push({id: cats.length + 1, name, description, breed, image: files.upload.name});

                let json = JSON.stringify(cats);
                fs.writeFile('./data/cats.json', json, 'utf-8', () => console.log(`Successfully added cat ${name}`));
           })

           res.writeHead(302, {location: '/'});
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

                fs.writeFile('./data/breeds.json', json, 'utf-8', () => console.log(`Successfully added breed ${breedObj.breed}`));
            })

            res.writeHead(302, {location: '/'});
            res.end();
        })
    } else if(pathname.includes('/cats-edit') && req.method === 'GET'){
        fs.readFile(`./views/editCat.html`, (err, data) => {
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
            let urlParts = req.url.split('/');
            let catId = +urlParts[urlParts.length -1];

            fs.readFile('./data/cats.json', (err, catsData) => {
                if(err){
                    throw err;
                }
 
                 let cats = JSON.parse(catsData);
                 
                 let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
                 let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder);

                 cats.forEach(cat => {
                     if(cat.id === catId){
                      
                        modifiedData = modifiedData.replace('{{name}}', cat.name);
                        modifiedData = modifiedData.replace('{{description}}', cat.description);
                        modifiedData = modifiedData.replace('{{id}}', catId);
                     }
                 });

                 res.write(modifiedData);
                 res.end();
            })
        })
    } else if(pathname.includes('/cats-edit') && req.method === 'POST'){  
        let urlParts = req.url.split('/');
        let catId = +urlParts[urlParts.length -1];

        form.parse(req, (err, fields, files) => {
           if(err){
               throw err;
           }

           let { name, description, breed } = fields;

           let oldPath = files.upload.path;
           let newPath =  path.normalize(path.join(__dirname, `../content/images/${files.upload.name}`))
           mv(oldPath, newPath, (err) => {
               if(err){
                   throw err;
               }

               console.log('Successfully upload image');
           })

           fs.readFile('./data/cats.json', (err, data) => {
               if(err){
                   throw err;
               }

                let cats = JSON.parse(data);

                cats.forEach(cat => {
                    if(cat.id === catId){
                        cat.name = name;
                        cat.description = description;
                        cat.breed = breed;
                        cat.image = files.upload.name
                    }
                });
                let json = JSON.stringify(cats);
                fs.writeFile('./data/cats.json', json, 'utf-8', () => console.log(`Successfully added cat ${name}`));
           })

           res.writeHead(302, {location: '/'});
           res.end();
        })
    } else if(pathname.includes('/cats-find-new-home') && req.method === 'GET'){
        fs.readFile(`./views/catShelter.html`, (err, data) => {
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

            let urlParts = req.url.split('/');
            let catId = +urlParts[urlParts.length -1];

            let modifiedData = data.toString();
            
            fs.readFile('./data/cats.json', (err, catsData) => {
                if(err){
                    throw err;
                }
 
                 let cats = JSON.parse(catsData);
                 cats.forEach(cat => {
                     if(cat.id === catId){
                      
                        let catBreedPlaceholder = `<option value="${cat.breed}">${cat.breed}</option>`;
                        modifiedData = modifiedData.replace('{{breed}}', catBreedPlaceholder);

                        modifiedData = modifiedData.replace('{{name}}', cat.name);
                        modifiedData = modifiedData.replace('{{description}}', cat.description);
                        modifiedData = modifiedData.replace('{{id}}', catId);
                        modifiedData = modifiedData.replace('{{image}}', '/content/images/' + cat.image);
                    }
                });
                res.write(modifiedData);
                res.end();
            })
        })
    } else if(pathname.includes('/cats-find-new-home') && req.method === 'POST'){
        let urlParts = req.url.split('/');
        let catId = +urlParts[urlParts.length -1];

        fs.readFile('./data/cats.json', (err, catsData) => {
            if(err){
                throw err;
            }
             let otherCats = [];
             let cats = JSON.parse(catsData);
             cats.forEach(cat => {
                 if(cat.id !== catId){
                  otherCats.push(cat);
                }
            });
            cats = otherCats;

            let json = JSON.stringify(otherCats);

            fs.writeFile('./data/cats.json', json, 'utf-8', () => console.log(`Successfully sheltered cat.`));

            res.writeHead(302, {location: '/'});
            res.end();
        })
    } else{
        return true;
    }
}
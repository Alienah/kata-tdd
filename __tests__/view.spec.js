import createView from '../src/js/view.js';

import fs from 'fs';
import path from 'path';

function loadTemplate(filepath, onLoad) {
    const filePath = path.join(__dirname, filepath);
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (!err) {
            onLoad(data);
        } else {
            console.log(err);
        }
    });
}

describe('app view', () =>{
    beforeEach((done)=> {
        loadTemplate("../index.html", function(text){
            document.body.innerHTML = text;
            const appView = createView();
            done();
        })
     })

    it('is reading the DOM', () => {
        expect(document.getElementById('intro-container'))
            .not.toBeNull();
    })
})

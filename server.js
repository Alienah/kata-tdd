const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/questions', (request, response) => {
    console.log('Recibida peticion');

        const questions = [
        {
            question: 
                { 
                    id: 1, text: '¿Capital de Honduras?' 
                },
            answers: [
                        { 
                            id: 1, text: 'Tegucigalpa' 
                        }, 
                        { 
                            id: 2, text: 'Lima' 
                        }, 
                        { 
                            id: 3, text: 'Buenos Aires' 
                        }
                    ],
            correctAnswerId: 1
        },
        {
            question: 
                {
                id: 2, text: 'Rio que pasa por Toledo' 
                },
            answers: [
                        { 
                            id: 4, text: 'Miño' 
                        }, 
                        { 
                            id: 5, text: 'Tajo' 
                        }, 
                        { 
                            id: 6, text: 'Duero' 
                        }
                    ],
            correctAnswerId: 5
        },
        {
            question: 
                { 
                    id: 3, text: 'Color Bandera de Argentina' 
                },
            answers: [
                        { 
                            id: 7, text: 'Rojo Blanco' 
                        }, 
                        { 
                            id: 8, text: 'Blanco y Verde' 
                        }, 
                        {
                            id: 9, text: 'Azul Blanco Azul' 
                            }
                    ],
            correctAnswerId: 9
        },
        {
            question: 
                { 
                    id: 3, text: '¿Quién pintó la capilla sixtina?' 
                },
            answers: [
                        { 
                            id: 7, text: 'Picasso' 
                        }, 
                        { 
                            id: 8, text: 'Velazquez' 
                        }, 
                        {
                            id: 9, text: 'Miguel Angel' 
                            }
                    ],
            correctAnswerId: 9
        },
    ];
    
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(questions));
});

// START APP
app.listen(port, () => console.log(`Listening on port ${port}`));
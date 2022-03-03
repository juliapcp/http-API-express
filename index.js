const express = require('express');
const app = express();
const port = 3000;



const users = [];
app.get('/', (req, res) => {
    const {
        query,
        params,
        baseUrl,
        path
    } = req;

    res.send(`Minha página!
    <pre>${JSON.stringify(query, null, 2)}</pre>
    <pre>${JSON.stringify(params, null, 2)}</pre>
    <pre>${JSON.stringify(baseUrl, null, 2)}</pre>
    <pre>${JSON.stringify(path, null, 2)}</pre>
    
    `);
});


app.get('/fatorial', (req, res) => {
    const {
        value
    } = req.query;
    let number = Number(value);
    if (isNaN(number)) {
        return res.send('O usuário enviou um número inválido.')
    } else {
        let fat = 1;
        for (let i = 1; i <= number; i++) {
            fat *= i;
        }

        return res.send(`${number}! = ${fat}`)
    }
});


app.get('/fat/:numero', (req, res) => {
    const {
        numero
    } = req.params;
    let number = Number(numero);
    if (isNaN(number)) {
        return res.send('O usuário enviou um número inválido.')
    } else {
        let fat = 1;
        for (let i = 1; i <= number; i++) {
            fat *= i;
        }

        return res.send(`${number}! = ${fat}`)
    }
});

app.get('/msg/:quantidade/:texto', (req, res) => {
    const {
        quantidade,
        texto
    } = req.params;

    let number = Number(quantidade);
    if (isNaN(number)) {
        return res.send('O usuário enviou uma quantidade inválida.');
    } else {
        return res.send(`${texto} `.repeat(number));
    }
});


app.get('/envia', (req, res) => {
    const {
        name,
        age
    } = req.query;

    users.push({
        name,
        age
    });
    return res.send(`O usuário ${name} possui ${age} anos.`);
});

app.get('/lista', (req, res) => {
    return res.send(JSON.stringify(users, null, 2));
});

app.get('/lista/:id', (req, res) => {
    const {
        id
    } = req.params;

    let number = Number(id);
    if (isNaN(number)) {
        return res.send('Id inválido');
    } else if (users[number] !== undefined) {
        let usuario = users[number];
        return res.send(
            `Nome:${usuario.name}
            Idade:${usuario.age}`);
    } else {
        return res.send('Id Inválido');
    }


})

app.listen(port, () => {
    console.log("Servidor iniciado na porta " + port);
});
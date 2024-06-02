import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('index.html');
});

app.get('/login', (req, res) => {
    res.sendFile('login.html');
})

app.get('/register', (req, res) => {
    res.sendFile('register.html');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
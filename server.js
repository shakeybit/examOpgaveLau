const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;
const db = new sqlite3.Database('registrations.db');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/oversigt1', (req, res) => {
    res.sendFile(path.join(__dirname, '/oversigt1.html'));
});

app.get('/oversigt2', (req, res) => {
    res.sendFile(path.join(__dirname, '/oversigt2.html'));
});

app.get('/oversigt3', (req, res) => {
    res.sendFile(path.join(__dirname, '/oversigt3.html'));
});

app.get('/indberet', (req, res) => {
    res.sendFile(path.join(__dirname, '/indberet.html'));
});

app.post('/gemRegistration', (req, res) => {
    const { date, renterName, renterAddress, renterTlf, problem, fixed } = req.body;

    db.run('CREATE TABLE IF NOT EXISTS registrations (id INTEGER PRIMARY KEY AUTOINCREMENT, Nr INTEGER, date TEXT NOT NULL, renterName TEXT NOT NULL, renterAddress TEXT NOT NULL, renterTlf TEXT NOT NULL, problem TEXT, fixed TEXT)');
    
    const stmt = db.prepare('INSERT INTO registrations (Nr, date, renterName, renterAddress, renterTlf, problem, fixed) VALUES (?, ?, ?, ?, ?, ?, ?)');
    stmt.run(date, renterName, renterAddress, renterTlf, problem, fixed);
    stmt.finalize();

    res.send('Lejer er blevet indberet!');
});

app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`);
});
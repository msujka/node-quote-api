const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ 'quote': randomQuote });
});

app.get('/api/quotes', (req, res) => {
    if (req.query.person) {
        const quotesByPerson = quotes.filter((quote) => quote.person === req.query.person);
        res.send({ quotes: quotesByPerson });
    }
    else {
        res.send({ quotes: quotes });
    }
});

app.post('/api/quotes', (req, res) => {
    const newQuote = req.query.quote;
    const newPerson = req.query.person;
    if (newQuote && newPerson) {
        const quote = { 'quote': newQuote, 'person': newPerson };
        quotes.push(quote);
        res.send({ quote: quote });
    }
    else {
        res.status(400).send();
    }
});
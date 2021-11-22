const express = require('express')
const path = require('path')
const counter = require('./public/views/counter.html')
const app = express()
const port = 3000


app.use(express.json()); // using user json inputs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    return res.render(counter);
});

app.post('/count', (req, res) => {
    paragraph = req.body.text;
    paragraph = paragraph.replace(/(^\s*)|(\s*$)/gi,""); // Exclude the start and end spaces
    paragraph = paragraph.replace(/[ ]{2,}/gi," "); // reduce multiple spaces to a single space
    paragraph = paragraph.replace(/\n /,"\n"); // exclude a new line with a start spacing
    counter = paragraph.split(' ').length; // count words

    res.send(`The number of words in your text is: ${counter}`)
    console.log(`The number of words in your text is: ${counter}`);
})

// start the server
app.listen(port, () => console.log(`Server running on port: ${port}`))

const express = require('express')
const port  = 3000
const chalk = require('chalk')
const path = require('path')
const {addNote, getNotes, removeNote, editNote} = require('./notes.controller')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}))

app.get('/', async (req, res) => {
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false,
    })
})

app.post('/', async (req, res) => {
    await addNote(req.body.title)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: true,
    })
})

app.delete('/:id', async (req, res) => {
    await removeNote(req.params.id)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false,
    })
})

app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    await editNote(id, title);

    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false,
    })
})

app.listen(port, ()=> {
    console.log(chalk.green(`Server on port ${port} started...`))
})
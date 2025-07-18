const fs = require('fs/promises');
const path = require('path');
const chalk = require("chalk");

const notesPath = path.join(__dirname, 'db.json')

async function addNote (title) {
    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString(),
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function getNotes (title) {
    const notes = await fs.readFile(notesPath, {encoding : 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ?  JSON.parse(notes) : []

}

async function printNotes () {
    const notes = await getNotes()
    console.log(chalk.bgBlue('Here is the notes list:'))
    notes.forEach(note => {
        console.log(chalk.blue(note.id, note.title));
    })
}

async function removeNote (id) {
    const notes = await getNotes()
    const noteToRemove = notes.find((note) => note.id === id)

    if (!noteToRemove) {
        console.log(chalk.red(`Note with ID ${id} not found.`));
        return;
    }

    const updatedNotes = notes.filter(note => note.id !== id)
    await fs.writeFile(notesPath, JSON.stringify(updatedNotes))

    console.log(chalk.bgRed('Note removed'))
    console.log(chalk.red(`File: ${noteToRemove.title} | ID: ${id}`))
}

async function editNote(id, title) {
    const notes = await getNotes();
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex === -1) {
        throw new Error(`Note with ID ${id} not found`);
    }

    notes[noteIndex].title = title;
    await fs.writeFile(notesPath, JSON.stringify(notes));

    console.log(chalk.bgYellow('Note updated'));
    console.log(chalk.yellow(`ID: ${id}, New title: ${title}`));
}

module.exports = {
    addNote, getNotes, removeNote, editNote, printNotes
}
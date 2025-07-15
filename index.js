const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const chalk = require("chalk");

const {addNote, printNotes, removeNote} = require('./notes.controller')

const pkg = require("./package.json");

//создаем команды

yargs(hideBin(process.argv))
    .version(pkg.version)
    .command({
        command: 'add',
        describe: 'Add new note to list',
        builder: {
            title: {
                type: 'string',
                describe: 'Note title',
                demandOption: true
            },
        },
        handler({ title }) {
            addNote(title);
            console.log(chalk.bgGreen('Note was added!'));
        },
    })
    .command({
        command: 'list',
        describe: 'Print all notes',

        async handler() {
            printNotes()
        },
    })
    .command({
        command: 'remove',
        describe: 'Remove note by id',
        builder: {
            id : {
                type: 'string',
                describe: 'Note ID',
                demandOption: true
            }
        },
        async handler({id}) {
            await removeNote(id)
        }
    })
    .parse(); // команды нужно проинициализировать методом parse()




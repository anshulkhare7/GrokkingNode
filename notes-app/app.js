const notesUtil = require('./notes')
const chalk = require('chalk');
const log = console.log;
const yargs = require('yargs');
const fs = require('fs')

yargs.command({
    command: 'list',
    description: 'List all the notes',
    handler(){
        notesUtil.getNotes();
    }
});

yargs.command({
    command: 'read',
    description: 'Return the body of a note',
    builder : {
        title: {
            describe: 'title of the note to be searched',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notesUtil.findNote(argv.title);
    }
})
yargs.command({
    command: 'add',
    description: 'Adds new note', 
    builder: {
        title: {
            describe : "Title to be added",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe : "Body to te added",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notesUtil.addNote(argv.title, argv.body)
    }
});

yargs.command({
    command: 'remove',
    description: 'Removes a note', 
    builder: {
        title: {
            describe : "Title to be removed",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        const removedNote = notesUtil.removeNote(argv.title)
        if(removedNote ==='{}')  
            log(chalk.red('No notes removed!'))
        else
            log(chalk.green('Removed Note: '+removedNote))
            
    }
});

yargs.parse();

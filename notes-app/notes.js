const fs = require('fs')
const chalk = require('chalk')

const log = console.log

const getNotes = () => { 
    log(chalk.white.inverse('Getting notes...'))
    const notes = loadNotes().forEach((note) => log(note.title))
}

const findNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.title === title);

    if(foundNote){
        log(chalk.inverse(foundNote.title))
        log(foundNote.body)
    }else{
        log(chalk.bgRed.white("Note not found"))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNode = notes.find((note) => note.title === title)

    if(!duplicateNode){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        log(chalk.green.inverse('Note added'));
    }else{
        log(chalk.red('Note title exists.'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    var removedNote = {}
    const filteredNotes = notes.filter((note) => {
        if(note.title === title){
            removedNote = note;            
            return false;
        }else{
            return true;
        }        
    });
    saveNotes(filteredNotes)
    return JSON.stringify(removedNote);
}

const saveNotes = (notes) => fs.writeFileSync('notes.json',JSON.stringify(notes));  

const loadNotes = () => {    
    try{
       return JSON.parse(fs.readFileSync('notes.json').toString());
    }catch(e){
       return [] 
    }
}

module.exports =  {
    addNote: addNote,
    removeNote: removeNote,
    getNotes: getNotes,
    findNote: findNote
}
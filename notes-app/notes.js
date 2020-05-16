const fs = require('fs')
const chalk = require('chalk')

const log = console.log

const getNotes = () => { return chalk.blue("Getting your notes...")}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNodes = notes.filter((note) => note.title === title)

    if(duplicateNodes.length===0){
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
    removeNote: removeNote    
}
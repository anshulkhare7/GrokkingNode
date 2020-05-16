const fs = require('fs')

const getNotes = function (){
    return "Getting your notes..."
}

const addNote = function (title, body){
    const notes = loadNotes();
    const duplicateNodes = notes.filter(function(note){
        return note.title === title
    })

    if(duplicateNodes.length===0){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log('Note added');
    }else{
        console.log('Note title exists.');
    }
}

const removeNote = function(title){
    const notes = loadNotes();
    var removedNote = {}
    const filteredNotes = notes.filter(function(note){
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

const saveNotes = function(notes){
    fs.writeFileSync('notes.json',JSON.stringify(notes));
}

const loadNotes = function(){    
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
// Emily Herman 
// MSU Coding Bootcamp Homework 11
// Due date: 12/1/2020
// htmlRoutes.js: get, post, and delete notes to/from /api/notes page

// Dependencies:
var path = require("path");
var fs = require("fs");

// Routing:
module.exports = function(app) {

    // Need "/" route for Heroku deployment
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../../index.html"));
    });

    // GET `/notes` - Returns the `notes.html` file
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../../notes.html"));
    });
    
    // GET `/api/notes` - Reads the `db.json` file and returns all saved notes as JSON
    app.get("/api/notes", function(req, res) {
       
        // Read notes
        var rawNotes = fs.readFileSync("db/db.json");
        
        // Convert notes to JSON
        noteData = JSON.parse(rawNotes);

        return res.json(noteData);
    })

    // GET `*` - returns the `index.html` file
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../../index.html"));
    });


    // POST `/api/notes` - Receives a new note to save on the request body, adds it to the `db.json` file, 
    //   then returns the new note to the client
    app.post("/api/notes", function(req, res) {

        var newNote = req.body;

        // Assign an id to the new note, for use in delete function
        let id = noteData.length;
        newNote.id = id;

        // Add note to end of note object
        noteData.push(newNote); 

        // Convert note to string and write to file
        var stringNotes = JSON.stringify(noteData); 
        fs.writeFileSync("db/db.json", stringNotes); 

        return res.json(stringNotes); 
    })

    // * DELETE `/api/notes/:id` - Receives a query parameter containing the id of the note to delete
    app.delete("/api/notes/:id", function(req, res) {
        var deleteID = req.params.id;

        // Remove note from Notes object
        noteData.splice(deleteID, 1);

        // Reassign ids to notes
        for (var i = 0; i < noteData.length; i++) {
            noteData[i].id = i;
        }

        // Convert note object to string and write to file
        var stringNotes = JSON.stringify(noteData); 
        fs.writeFileSync("db/db.json", stringNotes); 

        return res.json(false);
    }); 
}


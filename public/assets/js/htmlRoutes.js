
// Dependencies:
var path = require("path");
var fs = require("fs");

// // COPIED
// const dbNotes = JSON.parse(
//     fs.readFileSync(path.join(__dirname, "/db/db.json"), (err, data) => {
//         if (err) throw err;
//     })
//     );
    
// // COPIED
// const dbUpdate = dbNotes => {
// fs.writeFileSync(
//     path.join(__dirname, "/db/db.json"),
//     JSON.stringify(dbNotes),
//     err => {
//     if (err) throw err;
//     }
// );
// };

// Routing:

module.exports = function(app) {

    // app.get("index.js", function(req, res) {
    //     res.sendFile(path.join(__dirname, "./index.js"));
    // });

    // GET `/notes` - Should return the `notes.html` file.
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../../notes.html"));
    });
    
    // GET `/api/notes` - Should read the `db.json` file and return all saved 
    // notes as JSON.
    app.get("/api/notes", function(req, res) {
        // Load data:
        var rawNotes = fs.readFileSync("../../../db/db.json");
        noteData = JSON.parse(rawNotes);
        console.log(noteData);
        return res.json(noteData);
    })

    // GET `*` - Should return the `index.html` file
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../../index.html"));
    });


    // POST `/api/notes` - Should receive a new note to save on the request 
    // body, add it to the `db.json` file, and then return the new note to the 
    // client.
    app.post("/api/notes", function(req, res) {

        var newNote = req.body;
        console.log(typeof newNote); // object
        let id = noteData.length;

        newNote.id = id;

        //newNoteJSON = JSON.parse(newNote); // converts string to JSON

        noteData.push(newNote); // pushes note as object
        console.log(noteData);

        var stringNotes = JSON.stringify(noteData); // converts object to string

        fs.writeFileSync("../../../db/db.json", stringNotes); // writes new notes to db.json file

        return res.json(stringNotes); // post new notes as JSON to /api/notes
    })

    // * DELETE `/api/notes/:id` - Should receive a query parameter containing 
    // the id of a note to delete. This means you'll need to find a way to give 
    // each note a unique `id` when it's saved. In order to delete a note, 
    // you'll need to read all notes from the `db.json` file, remove the note 
    // with the given `id` property, and then rewrite the notes to the `db.json`
    // file.

    app.delete("/api/notes/:id", function(req, res) {
        var deleteID = req.params.id;

        noteData.splice(deleteID, 1);

        // rewrite and push noteData with new ids
        for (var i = 0; i < noteData.length; i++) {
            noteData[i].id = i;
        }

        var stringNotes = JSON.stringify(noteData); // converts object to string
        fs.writeFileSync("../../../db/db.json", stringNotes); // writes new notes to db.json file

        return res.json(false);
    });

    // COPIED
    // app.delete("/api/notes/:id", (req, res) => {
    //     let id = req.params.id;
    //     let x = 1;
    //     delete dbNotes[id - 1];
    //     dbUpdate(dbNotes);
    //     res.send(dbNotes);
    // });

}


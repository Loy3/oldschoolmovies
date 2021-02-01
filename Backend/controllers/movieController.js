const db_connection = require("../conn.config.js");

// INSERTING MOVIE
exports.insert = async (req, res, next) => {

if (!req.body.title ) {
return res.status(400).json({
message: "Please fill in all the required fields.",
fields: ["Title"],
});
}

try {
const queryStatement= "INSERT INTO `movies_tbl`(`title`,`description`,`release_year`,`genre`,`directors`,`writers`,`stars`) VALUES(?,?,?,?,?,?,?)";
const movieValue= [req.body.title, req.body.description, req.body.year, req.body.genre, req.body.directors, req.body.writers, req.body.stars];

db_connection.conn.query(queryStatement, movieValue, (err, result, rows ) =>{
if(!err) {
return res.status(201).json({
message: "Movie Entry has been successfully created" });}

})
}
catch (err) {
next(err);
}

}


// FETCHING EVERY MOVIE
exports.getAllMovies = async (req, res, next) => {
try {

db_connection.conn.query("SELECT * FROM `movies_tbl` ", (err,rows,fields) =>{
if (rows.length === 0) {
return res.status(200).json({
message:
"There are no movies in the database, please insert some users.",
});
}

res.status(200).json(rows);

});



} catch (err) {
next(err);
}

};


// FETCHING SINGLE MOVIE
exports.getMovieByID = async (req, res, next) => {

try {


const queryStatement = "SELECT * FROM `movies_tbl` WHERE `id`=?";
const movieValue = [req.params.id];
//   db_connection.conn.query(queryStatement, movieValue,(err,rows,fields) =>{
db_connection.conn.query(queryStatement, movieValue, (err, result, rows ) =>{
if(!err) {

if (rows.length === 0) {
return res.status(404).json({
message: "No Movie Found!",
});}
res.status(200).json(rows[0]);
}

});


}
catch (err) {
next(err);
}

};

// UPDATING MOVIE
exports.updateMovie = async (req, res, next) => {
try {

db_connection.conn.query(
"SELECT * FROM `movies_tbl` WHERE `id`=?",
[req.params.id],(err, row, fields) =>{

if (row.length === 0) {
return res.status(404).json({
message: "Invalid Movie Title",
});
}

/*"INSERT INTO `movies_tbl`(`title`,`description`,`release_year`,`genre`,`directors`,`writers`,`stars`) VALUES(?,?,?,?,?,?,?)",
[req.body.title, req.body.description, req.body.year, req.body.genre, req.body.directors, req.body.writers, req.body.stars]*/

if (req.body.title) row[0].title = req.body.title;
if (req.body.description) row[0].description = req.body.description;
if (req.body.year) row[0].year = req.body.year;
if (req.body.genre) row[0].genre = req.body.genre;
if (req.body.directors) row[0].directors = req.body.directors;
if (req.body.writers) row[0].writers= req.body.writers;
if (req.body.stars) row[0].stars= req.body.stars;


db_connection.conn.query(
"UPDATE `movies_tbl` SET`title`=?,`description`=?,`release_year`=?,`genre`=?,`directors`=?,`writers`=?,`stars`=? WHERE `id`=?",
[row[0].title, row[0].description,row[0].year, row[0].genre, row[0].directors, row[0].writers, row[0].stars, req.params.id]
);

if (row.affectedRows === 1) {
return res.json({
message: "Movie has  been successfully updated.",
});
}


});

} catch (err) {
next(err);
}

};

// DELETING MOVIE
exports.deleteMovie = async (req, res, next) => {

try {

db_connection.conn.query(
"DELETE FROM `movies_tbl` WHERE `id`=?",
[req.params.id], (err,row,fields) => {

if (row.affectedRows === 0) {
return res.status(404).json({
message: "Invalid Movie ID (No Movie Found!)",
});
}

res.status(200).json({
message: "The Movie has been deleted successfully.",
});

});



} catch (err) {
next(err);
}

};

//login
exports.login= async(req,res, next) => { 

    var email= req.body.email;
    var password = req.body.password;
    if(email && password)
    {

    db_connection.conn.query('SELECT * FROM admin WHERE email = ?',[email], async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"+error
        })
      }else{
        if(results.length >0){
         // const comparision = compare(password, results[0].password)
          if(results[0].password === password){
              res.send({
                "code":200,
                "success":"login sucessfull"
              })
          }
          else{
            res.send({
                 "code":204,
                 "success":"Email and password does not match"
            })
          }
        }
        else{
          res.send({
            "code":206,
            "success":"Email does not exits"
              });
        }
      }

});
    }
    else{
        res.send({message:"please enter Your login details"})
    }
}

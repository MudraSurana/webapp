const { response } = require('express')
const express = require('express')
const request = require('request')
const app = express()

app.set("view engine", "ejs")

app.get('/',(req,res)=>{
    res.render("home")
})

app.get('/student/:rollno',(req,res)=>{
    console.log(req.params)
    res.send(`you are viewing profile of some student with roll no. ${req.params.rollno}`)
})
app.get('/result',(req,res)=>{
    console.log(req.query)
    //res.send(`You searched for ${req.query.movieName}`)
    const url=`http://www.omdbapi.com/?i=tt3896198&apikey=8040a924=${req.query.movieName}`;
    request(url,fuction (error,response,body){
        if(!error && response.statusCode===200){
            const data = JSON.parse(body)
            //res.send(data);
            res.render('result', {moviesDump:data})
        }else {
            res.send('Something went wrong');

        }

    });
});
app.get("/result", (req, res)=>{
    const query = req.query.search;
    const url = "http://www.omdbapi.com/?apikey=cfd672ef&s=" + query;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            //console.log(data);
            if(data.Response==='False'){
                res.send("Movie Not Found");
            }else{
                res.render("Result", {data:data});    
            }
        }else{
            res.send('Error');
        }
    });
});
app.get("/result/:id", (req, res)=>{
    const url = "http://www.omdbapi.com/?apikey=cfd672ef&i=" + req.params.id;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            //console.log(data);
            if(data.Response==='False'){
                res.send("Movie Not Found");
            }else{
                //res.send(data);
                res.render("Info", {movie: data});    
            }
        }else{
            res.send('Error');
        }
    });
});
app.get("*", (req, res)=>{
    res.send("Some Error");
});
app.listen(3000,()=>{
    console.log('server has started')
})
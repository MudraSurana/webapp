const express=require('express')
const request=require('request')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
//Middlewares
app.set("view engine", "ejs")
app.use('/public', express.static('public'))

app.get('/', (req, res)=>{
    res.render("home")
})
app.get('/result', (req, res)=>{
    console.log(req.query)
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
    request(url, function (error, response, body){
        if(!error && response.statusCode===200){
            const data=JSON.parse(body)
            res.render('result', {moviesDump: data})
        }else{
            res.send('Something went wrong')
        }
    })
})
app.get('/result/:id', (req, res)=>{
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url, function (error, response, body){
        if(!error && response.statusCode===200){
            const data=JSON.parse(body)
            res.render('detail', {data: data})
        }else{
            res.send('Something went wrong')
        }
    })
})
app.get('*', (req, res)=>{
    res.send('404 not found')
})
app.listen(3000, ()=>{
    console.log("Server has started at port 3000")
})
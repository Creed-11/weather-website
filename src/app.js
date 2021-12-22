const express =require('express')
const path =require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Path for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mitesh'
    })
})

app.get('/about', (req,res)=> {
    res.render('about',{
        title: 'About me',
        name: 'Mitesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Mitesh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, address} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, foreData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            
           res.send({
               location: req.query.address,
               weather: foreData.weather,
               temperature: foreData.temperature,
               feelsLike: foreData.feelslike
           })
            
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404!',
        errorMessage: 'Help Article Not found.',
        name: 'Mitesh'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title : 'Error 404!',
        errorMessage: 'Page Not Found.',
        name: 'Mitesh'
    })
})

app.listen(port , () => {
    console.log('Server is up on port '+ port)
})
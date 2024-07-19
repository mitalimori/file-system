import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
// import fs from 'fs'

var app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    res.render('index')
})

app.post('/', function (req, res) {
    var name = req.body.name
    var age = req.body.age
    var number = req.body.number

    var OldData = fs.readFileSync('data.json')


    OldData = JSON.parse(OldData)

    var data = { name: name, age: age, number: number }

    OldData.push(data)
    console.log(OldData);
    OldData = JSON.stringify(OldData)
    fs.writeFileSync('data.json', OldData)
    res.send(OldData)
})

app.get('/delete/:age', function (req, res) {
    var age = req.params.age
    var OldData = fs.readFileSync('data.json')
    OldData = JSON.parse(OldData)

    var index = OldData.findIndex(iteam => iteam.age === age)
    console.log(index);

    if (index !== -1) {
        OldData.splice(index, 1)
    }

    OldData = JSON.stringify(OldData)
    fs.writeFileSync('data.json', OldData)
    res.send(OldData)

})


app.listen(3000)
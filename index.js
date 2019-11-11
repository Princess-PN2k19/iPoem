var bodyParser = require("body-parser");
var app = require('express')();
var express = require('express');
var http = require("http").Server(app)
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var poem = require("./model/poem.js");

app.use('/assets', express.static(__dirname + '/assets'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ type: 'application/*+json' }))

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.put('/title/create', function (req, res) {
    console.log(req.body)
    var detailss = new poem(req.body)
    detailss.save(function (err, info) {
        if (err) return res.status(422).json(err);
        console.log(info._id + " saved!");

        poem.find({ title: info.title }, function (err, data) {
            if (err) {
                console.log("ERR: " + err)
            } else {
                res.json(data)
            }
        })
    });
})

app.get('/title/retrieve/all', function (req, res) {
    poem.find(function (err, data) {
        res.json({ data: data });
    })
})

app.get('/title/retrieve/:id', function (req, res) {
    console.log("Here is the ID: " + req.params.id)
    poem.findOne({ _id: req.params.id }, function (err, data) {
        if (err) return res.status(200).json(err);
        return res.status(200).json(data);
    })
})

app.put('/title/update/', function (req, res) {
    poem.findOneAndUpdate({ _id: req.body.id }, { title: req.body.title, currentDT: req.body.currentDT, poem: req.body.poem }, {
        new: true,
        upsert: true
    }, function (err, data) {
        if(err) res.status(422).json(err)
        console.log(data)
        res.json(data)
    })
})

app.delete('/title/delete', function (req, res) {
    console.log(req.body);
    poem.findOneAndDelete({ _id: req.body.id }, function (err, data) {
        if (err) return console.log(err);
        const response = {
            message: "Successfully deleted",
        };
        return res.status(200).send(response);
    })
})

http.listen(port, function () {
    console.log('listening on *:' + port);
});
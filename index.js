const express = require('express');
const fs = require('fs');
const app = express();

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

app.get('/:folder/:id', (req, res) => {
    const { folder, id } = req.params;
    if (!folder || !id) {
        res.status(418).send({ "message": "invalid folder or id" });
    }
    try {
        const data = JSON.parse(fs.readFileSync(`./json/${folder}/${id}.json`));
        res.status(200).send(data);
    }catch(error) {
        res.status(419).send({ "message": "folder or id not found"});
    }
});

module.exports = {
  api: functions.https.onRequest(app),
};
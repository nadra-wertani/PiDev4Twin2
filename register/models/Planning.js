// models/Planning.js
const mongoose = require('mongoose');

const interventionTypeEnum = ['CriticalEmergency', 'ModerateEmergency', 'MinorEmergency'];

const planningSchema = new mongoose.Schema({
    idPlanning: Number,
    idPersonnel: Number,
    interventionType: { type: String, enum: interventionTypeEnum }, // Définition de l'énumération
    interventionDate: Date,
    status: String
});

module.exports = mongoose.model('Planning', planningSchema);

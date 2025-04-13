// models/HospitalizedPatient.js
const mongoose = require('mongoose');

const dischargeEnum = ['ReturnHomeOnFoot', 'ReturnHomeByAmbulance', 'Hospitalized'];

const hospitalizedPatientSchema = new mongoose.Schema({
    idHospitalization: Number,
    idPatient: Number,
    admissionDate: Date,
    dischargeDate: Date,
    roomNumber: String,
    discharge: { type: String, enum: dischargeEnum } // Définition de l'énumération
});

module.exports = mongoose.model('HospitalizedPatient', hospitalizedPatientSchema);

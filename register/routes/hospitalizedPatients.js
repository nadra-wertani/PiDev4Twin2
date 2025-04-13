const express = require('express');
const HospitalizedPatient = require('../models/HospitalizedPatient');
const { sendEmail } = require('../routes/emailUtils');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const fs = require('fs');
const router = express.Router();
const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('testEEE.pdf'));

doc.fontSize(16).text('Hello, this is a simple PDF!');
doc.end();
router.post('/add', async (req, res) => {
    try {
        // Créer un nouveau patient avec les données envoyées
        const patient = new HospitalizedPatient(req.body);
        
        // Sauvegarder le patient dans la base de données
        await patient.save();

        // Contenu de l'email
        const subject = `Nouveau Patient Hospitalisé: ${patient.idPatient}`;
        const text = `Un nouveau patient a été ajouté à l'hôpital:
        - ID Patient: ${patient.idPatient}
        - Date d'admission: ${patient.admissionDate}
        - Chambre: ${patient.roomNumber}
        `;

        // Envoi de l'email au médecin
        await sendEmail('nasserwissem22@gmail.com', subject, text);  // Remplace par l'email du médecin

        // Répondre avec le patient ajouté
        res.status(201).send(patient);

    } catch (err) {
        console.error('[Erreur ajout patient]', err);
        res.status(500).send('Erreur lors de l\'ajout du patient');
    }
});

// Read All
router.get('/', async (req, res) => {
    const patients = await HospitalizedPatient.find();
    res.send(patients);
});

// Read One
router.get('/:id', async (req, res) => {
    const patient = await HospitalizedPatient.findById(req.params.id);
    res.send(patient);
});

// Update
router.put('/:id', async (req, res) => {
    const patient = await HospitalizedPatient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(patient);
});

// Delete
router.delete('/:id', async (req, res) => {
    await HospitalizedPatient.findByIdAndDelete(req.params.id);
    res.send({ message: 'Patient supprimé' });
});

router.get('/:id/report', async (req, res) => {
    try {
        const patient = await HospitalizedPatient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ error: "Patient non trouvé" });
        }

        const doc = new PDFDocument();

        // Set headers to serve the PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=rapport-${patient.idHospitalization}.pdf`);

        // Pipe the PDF to the response
        doc.pipe(res);

        // Add content to the PDF
        doc.fontSize(16).text('Rapport d’Hospitalisation');
        doc.moveDown();
        doc.text(`ID Patient : ${patient.idPatient}`);
        doc.text(`Date d'admission : ${patient.admissionDate}`);
        doc.text(`Date de sortie : ${patient.dischargeDate || 'Non sorti'}`);
        doc.text(`Chambre : ${patient.roomNumber}`);
        doc.text(`Sortie : ${patient.discharge}`);

        doc.end();

    } catch (err) {
        console.error('[Erreur générer PDF]', err);
        res.status(500).json({ error: 'Erreur génération PDF' });
    }
});





module.exports = router;
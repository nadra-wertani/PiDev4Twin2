const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const routerb = require('./routes/hospitalRoutes');
const hospitalizedPatientsRouter = require('./routes/hospitalizedPatients');
const planningRouter = require('./routes/planning');
const personnelRoutes = require('./routes/personnel.routes');
const equipmentRoutes = require('./routes/equipmentRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/nom_de_votre_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log("✅ Connexion à MongoDB réussie"))
    .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

// Routes
app.use('/api/auth', authRoutes);
app.use("/hospitals", routerb);
app.use('/hospitalized-patients', hospitalizedPatientsRouter);
app.use('/planning', planningRouter);
app.use('/api/personnels', personnelRoutes);
app.use('/api/equipments', equipmentRoutes);

// Démarrage du serveur
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});

module.exports = app;

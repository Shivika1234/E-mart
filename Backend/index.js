const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const { paymentRoute } = require('./routes/paymentRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use('/api', paymentRoute)

app.get('/api/getkey', (req, res) => {
    res.status(200).json({ key: process.env.ROZER_API_KEY })
})

app.listen(process.env.PORT, (err) => {
    console.log(`server is connected on port http://localhost:${process.env.PORT}`);
});

// module.exports = { instance }

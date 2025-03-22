const express = require("express");
const dotenv = require("dotenv");
const sequelize = require('./config/database');
const path = require('path');
const cors = require('cors');

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors());

// // Allow requests from frontend
// app.use(cors({
//     origin: 'http://localhost:5173', // your frontend origin
//     credentials: true, // allow cookies if using them
//   }));

const PORT = process.env.PORT ;

const authRoutes = require('./routes/authRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/pdfs', pdfRoutes);
app.use('/uploads', express.static(path.join(__dirname, "uploads"))); // Securely serve PDFs - Only allow authenticated users
app.use('/api/comments', commentRoutes);


sequelize.sync()
    .then(()=>{
        app.listen(process.env.DB_PORT, ()=>{console.log(`server is running on port ${process.env.DB_PORT}`)});
    })
    .catch(err => console.log('Error connecting to database', err));


app.use((req, res, next)=>{
    res.status(404).json({message: 'Route not found'});
    next();
});

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(500).json({message: err.message});
    next();
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

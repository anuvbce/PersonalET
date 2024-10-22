const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactions');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://anuvbce:Anuradha%40123@clusterpet.mbwg5.mongodb.net/personalET?retryWrites=true&w=majority&appName=Clusterpet',
    {    
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/transactions', transactionRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

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
.then(async () =>{ console.log("Connected to MongoDB")
    try {
        await Transaction.collection.dropIndex("id_1");  // Replace with your actual index name
        console.log('Index dropped successfully');
    } catch (err) {
        console.log('Error dropping index or index does not exist:', err.message);
    }


})
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/transactions', transactionRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

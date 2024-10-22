const express = require('express');
const Transaction = require('../models/transactions');

const router = express.Router();

// POST /transactions - Add a new transaction
router.post('/', async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json({ message: "Transaction added successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /transactions - Retrieve all transactions
router.get('/', async (req, res) => {
    console.log('GET /transactions request received');
    try {
        const transactions = await Transaction.find();
        console.log('Transactions fetched:', transactions);
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error); 
        res.status(500).json({ error: error.message });
    }
});

// GET /transactions/:id - Retrieve a transaction by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const transaction = await Transaction.findById({id:id});
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /transactions/:id - Update a transaction by ID
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const transaction = await Transaction.findOneAndUpdate({id:id}, req.body, { new: true });
       
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.status(200).json({ message: "Transaction updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /transactions/:id - Delete a transaction by ID
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const transaction = await Transaction.findOneAndDelete({id:id});
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// Get a summary of transactions
router.get('/summary', async (req, res) => {
    try {
        // Fetch all transactions
        const transactions = await Transaction.find();
        
        // Initialize summary values
        let totalIncome = 0;
        let totalExpenses = 0;

        // Calculate totals
        transactions.forEach(transaction => {
            if (transaction.type === 'income') {
                totalIncome += transaction.amount;
            } else if (transaction.type === 'expense') {
                totalExpenses += transaction.amount;
            }
        });

        // Calculate balance
        const balance = totalIncome - totalExpenses;

        // Return summary
        res.status(200).json({
            totalIncome,
            totalExpenses,
            balance
        });
    } catch (error) {
        console.error('Error fetching summary:', error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;

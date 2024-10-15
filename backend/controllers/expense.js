const Expense = require('../models/ExpenseModel')
const mongoose = require('mongoose')


exports.addExpense = async(req,res)=>{
    const {title,amount,category,description,date} = req.body
    try {
        //Validations
        if(!title || !amount || !category || !description || !date) {
            return res.status(400).json({message : 'Some data is missing'})
        }
        if(amount < 0 || !amount ==='number') {
            return res.status(400).json({message:'Amount must be a Postive Number'})
        }

        const expenseAdded =  await Expense.create({title,amount,category,description,date})

        return res.status(200).json({message: 'Expense added'})
    } catch (error) {
        console.log(error)
    }
}

exports.getExpenses = async(req,res)=>{
    try {
        const Expenses = await Expense.find().sort({createdAt:-1})
        return res.status(200).json(Expenses)
    } catch (error) {
        return res.status(500).json('Server error')
    }
}

exports.deleteExpense = async(req,res)=>{
    const {id} = req.params
    try {
        const expenseDeleted = await Expense.findByIdAndDelete(id)
        return res.status(200).json({message:'InExpensecome deleted', expenseDeleted})
    } catch (error) {
        return res.status(500).json('Server error')
    }
}


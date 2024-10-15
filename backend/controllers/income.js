const Income = require('../models/IncomeModel')
const mongoose = require('mongoose')


exports.addIncome = async(req,res)=>{
    const {title,amount,category,description,date} = req.body
    try {
        //Validations
        if(!title || !amount || !category || !description || !date) {
            return res.status(400).json({message : 'Some data is missing'})
        }
        if(amount < 0 || !amount ==='number') {
            return res.status(400).json({message:'Amount must be a Postive Number'})
        }

        const incomeAdded =  await Income.create({title,amount,category,description,date})

        return res.status(200).json({message: 'Income added'})
    } catch (error) {
        console.log(error)
    }
}

exports.getIncomes = async(req,res)=>{
    try {
        const Incomes = await Income.find().sort({createdAt:-1})
        return res.status(200).json(Incomes)
    } catch (error) {
        return res.status(500).json('Server error')
    }
}

exports.deleteIncome = async(req,res)=>{
    const {id} = req.params
    try {
        const incomeDeleted = await Income.findByIdAndDelete(id)
        return res.status(200).json({message:'Income deleted', incomeDeleted})
    } catch (error) {
        return res.status(500).json('Server error')
    }
}


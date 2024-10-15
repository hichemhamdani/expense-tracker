import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5000/api/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
        getIncomes()
            .catch((err) =>{
                console.log(err)
            })
    }

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`)
            setIncomes(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-income/${id}`)
            getIncomes()
            .catch((err) =>{
                console.log(err)
            })
    }

    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expense)
        getExpenses()
            .catch((err) =>{
                console.log(err)
            })
    }

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`)
            setExpenses(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)
            getExpenses()
            .catch((err) =>{
                console.log(err)
            })
    }

    const totalIncome = () =>{
        let totalIncome = 0
        incomes.forEach(income=>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome
    }

    const totalExpense = () =>{
        let totalExpense = 0
        expenses.forEach(expense=>{
            totalExpense = totalExpense + expense.amount
        })
        return totalExpense
    }

    const totalBalance= ()=>{
        return totalIncome() - totalExpense()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }



    return (
        <GlobalContext.Provider value={{
            addIncome,
            incomes,
            getIncomes,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            expenses,
            totalExpense,
            totalBalance,
            transactionHistory
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
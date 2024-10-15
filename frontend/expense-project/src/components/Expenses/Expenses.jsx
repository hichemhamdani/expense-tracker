import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import { useGlobalContext } from '../../context/GlobalContext';
import Form from '../Form/Form';
import IncomeComponent from '../IncomeCompo/IncomeComponent';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const {addIncome,incomes,getIncomes,totalIncome,getExpenses,addExpense,deleteExpense,totalExpense,expenses} = useGlobalContext()
    useEffect(()=>{
        getExpenses()
        totalExpense()
    },[])
  return (
    <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-income">Total expense : <span>{totalExpense()} $</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {expenses.map(expense=>{
                            const {_id,title,amount,date,category,description} = expense
                            return <IncomeComponent 
                            key={_id}
                            id={_id}
                            title={title}
                            amount={amount}
                            date={date}
                            category={category}
                            description={description}
                            indicatorColor={'var(--color-green)'}
                            onClickItem = {deleteExpense}
                            type='expense'
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
    </ExpenseStyled>
  )
}

export default Expenses

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

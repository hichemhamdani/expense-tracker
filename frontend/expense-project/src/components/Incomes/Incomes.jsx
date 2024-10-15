import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import { useGlobalContext } from '../../context/GlobalContext';
import Form from '../Form/Form';
import IncomeComponent from '../IncomeCompo/IncomeComponent';

function Incomes() {
    const {addIncome,incomes,getIncomes,totalIncome,deleteIncome} = useGlobalContext()
    useEffect(()=>{
        getIncomes()
        totalIncome()
    },[])
  return (
    <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total income : <span>{totalIncome()} $</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map(income=>{
                            const {_id,title,amount,date,category,description} = income
                            return <IncomeComponent 
                            key={_id}
                            id={_id}
                            title={title}
                            amount={amount}
                            date={date}
                            category={category}
                            description={description}
                            indicatorColor={'var(--color-green)'}
                            onClickItem = {deleteIncome}
                            type='income'
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
    </IncomeStyled>
  )
}

export default Incomes

const IncomeStyled = styled.div`
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
import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/GlobalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)



function Chart() {
    const {incomes,expenses} = useGlobalContext()

    const data = {
        labels: incomes.map((income)=>{
            const {date} = income
            return dateFormat(date)
        }),
        datasets : [
            {label: 'Incomes',data: [
                ...incomes.map((income)=>{
                    return income.amount
                })
            ],
            backgroundColor : 'green',
            tension : .2
        },
        {label: 'Expenses',data: [
            ...expenses.map((expense)=>{
                return expense.amount
            })
        ],
        backgroundColor : 'red',
        tension : .2

    }              
        ]
    }
  return (
    <ChartStyled>
        <Line data={data}/>
    </ChartStyled>
  )
}

export default Chart


const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;
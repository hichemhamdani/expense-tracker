import { useState } from 'react'
import './App.css'
import styled from 'styled-components'

import bg from './img/bg.png'

import { MainLayout,InnerLayout } from './styles/Layout'
import Orb from './components/orb/Orb'
import Navigation from './components/Navigation/Navigation'
import Dashboard from './components/Dashboard/Dashboard'
import Incomes from './components/Incomes/Incomes'
import Expenses from './components/Expenses/Expenses'
import { useGlobalContext } from './context/GlobalContext'

import ViewTransactions from './components/viewTrans/ViewTransactions'

function App() {
  const [active, setActive] = useState(1)

  const global = useGlobalContext()

  const displayData = () =>{
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
          return <ViewTransactions />
      case 3:
          return <Incomes />
      case 4:
        return <Expenses />
      default:
        return <Dashboard />
    }
  }
  return (
    <AppStyled>
      <Orb />
      <MainLayout>
        <Navigation active={active} setActive={setActive}/> 
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  )
}



export default App


const AppStyled = styled.div`
  height : 100vh;
  background : url(${bg});
  position : relative;
    main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }

`
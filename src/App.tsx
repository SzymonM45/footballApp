import { useState } from "react"
import { Games } from "./Games"
import { Players } from "./Players"
import { Statistics } from "./Statistics"
import { Teams } from "./Teams"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export const App = () => {
  const [activeTab, setActiveTab] = useState('players');

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab)
  }


  return <QueryClientProvider client={queryClient}>
    <>

    <button onClick={() => handleChangeTab('players')}>Players</button>
    <button onClick={() => handleChangeTab('teams')}>Teams</button>
    <button onClick={() => handleChangeTab('games')}>Games</button>
    <button onClick={() => handleChangeTab('statistics')}>Statistics</button>
    <div>
      {activeTab==='players' && <Players/> }
      {activeTab==='teams' && <Teams/>}
      {activeTab==='games' && <Games/>}
      {activeTab === 'statistics' && <Statistics/>}
    </div>
    
    </>
    </QueryClientProvider>
}

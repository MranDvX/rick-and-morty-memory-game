import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import GraphQLClient from './services/rick-and-morty'
import Main from './components/Main/Main'
import Game from './components/Game/Game'
import './App.scss'

const App: React.FC = () => {
  return (
    // ApolloProvider is used to provide the GraphQL client to the app
    <ApolloProvider client={GraphQLClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App

import ReduxProvider from './redux/provider'
import Layout from './layout/Layout'
import Home from './pages/Home/Home'

const App = () => {
  return (
    <ReduxProvider>
      <Layout>
        <Home />
      </Layout>
    </ReduxProvider>
  )
}

export default App

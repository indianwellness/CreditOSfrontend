import { Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import Home from './pages/Home'
import Services from './pages/Services'
import Health from './pages/Health'
import Loans from './pages/Loans'
import Offers from './pages/Offers'
import Partner from './pages/Partner'
import Privacy from './pages/Privacy'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/financial-data-services" element={<Services />} />
        <Route path="/msme-financial-health" element={<Health />} />
        <Route path="/loan-products" element={<Loans />} />
        <Route path="/lender-offers" element={<Offers />} />
        <Route path="/partner-with-us" element={<Partner />} />
        <Route path="/privacy-and-help" element={<Privacy />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  )
}

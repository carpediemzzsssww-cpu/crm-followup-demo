import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import Toast from './components/ui/Toast';
import CustomerDetail from './pages/CustomerDetail';
import CustomerList from './pages/CustomerList';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-bg">
      <TopBar />
      <Sidebar />
      <div className="pt-12 lg:ml-[220px]">
        <Routes>
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="*" element={<Navigate to="/customers" replace />} />
        </Routes>
      </div>
      <Toast />
    </div>
  );
}

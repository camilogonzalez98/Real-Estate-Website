import { useState, useEffect } from 'react';
import ClientDashboard from '@/components/ClientDashboard';
import InvestorDashboard from '@/components/InvestorDashboard';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userType, setUserType] = useState<'client' | 'investor' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would come from authentication context
    // For demo purposes, we'll use localStorage or default to client
    const storedUserType = localStorage.getItem('userType') as 'client' | 'investor';
    if (storedUserType) {
      setUserType(storedUserType);
    } else {
      // Redirect to portal if no user type is set
      navigate('/portal');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/portal');
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h2>
          <p className="text-gray-600">Redirecting to portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
      
      {userType === 'client' ? <ClientDashboard /> : <InvestorDashboard />}
    </div>
  );
};

export default Dashboard;
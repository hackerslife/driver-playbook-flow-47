
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">Welcome to Driver Playbook Flow</h1>
        <p className="text-xl text-gray-600 mb-8">
          Track and manage tasks for multiple drivers with our intuitive Playbook Tracker.
        </p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg transition-all"
          onClick={() => navigate("/playbook")}
        >
          Go to Playbook
        </Button>
      </div>
    </div>
  );
};

export default Index;

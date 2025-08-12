import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BuyBPC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Buy BPC Code</h1>
        </div>

        {/* BPC Information Card */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">BPC Code Purchase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              A BPC code is required for all withdrawals. Purchase below to activate your withdrawal capabilities.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold text-blue-900">Price: ₦8,000</p>
              <p className="text-blue-700 text-sm mt-1">One-time purchase for unlimited withdrawals</p>
            </div>

            {/* Payment Instructions */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Payment Instructions:</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-sm text-gray-700">
                  <strong>Bank:</strong> MONIE POINT
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Account Number:</strong> 5770768256
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Account Name:</strong> ABDULAZEEZ JOLAADE YUSUF
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Amount:</strong> ₦8,000
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl py-4"
                onClick={() => window.open('https://wa.me/2348022972493', '_blank')}
              >
                Send Payment Proof via WhatsApp
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full rounded-2xl py-4"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BuyBPC;
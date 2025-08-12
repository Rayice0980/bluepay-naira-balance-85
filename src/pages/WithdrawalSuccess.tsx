import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const WithdrawalSuccess = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Withdrawal Status</h1>
        </div>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600 font-bold">
              Withdrawal Successful!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                Your withdrawal request has been submitted successfully
              </p>
              <p className="text-green-700 text-sm mt-2">
                Your funds will be processed and sent to your bank account within 24 hours
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
              >
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/transaction-history")}
                className="w-full border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg"
              >
                View Transaction History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default WithdrawalSuccess;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Banknote, Send } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";

const Withdraw = () => {
  const navigate = useNavigate();
  const { user, balance } = useAuth();
  const [formData, setFormData] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    amount: "",
    bpcCode: ""
  });
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const sendAuthCode = async () => {
    // Validate form fields first
    if (!formData.accountName || !formData.accountNumber || !formData.bankName || !formData.amount) {
      toast.error("Please fill in all bank details and amount first");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amount > balance) {
      toast.error("Insufficient balance");
      return;
    }

    if (amount > 300000) {
      toast.error("Maximum daily withdrawal is ₦300,000");
      return;
    }

    setIsSendingCode(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-auth-code', {
        body: {
          amount: amount,
          userEmail: user?.email || 'user@example.com'
        }
      });

      if (error) throw error;

      setIsAuthCodeSent(true);
      toast.success("Authentication code sent to admin email", {
        description: "Please check for the code and enter it below"
      });
    } catch (error) {
      console.error('Error sending auth code:', error);
      toast.error("Failed to send authentication code");
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user has purchased BPC
    if (!user?.hasPurchasedBPC) {
      toast.error("You need to purchase a BPC Code first to withdraw funds!", {
        description: "Click 'Get BPC Code' to purchase one.",
        action: {
          label: "Get BPC Code",
          onClick: () => navigate("/buy-bpc")
        }
      });
      return;
    }

    // Validate form fields
    if (!formData.accountName || !formData.accountNumber || !formData.bankName || !formData.amount || !formData.bpcCode) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isAuthCodeSent) {
      toast.error("Please send authentication code first");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amount > balance) {
      toast.error("Insufficient balance");
      return;
    }

    if (amount > 300000) {
      toast.error("Maximum daily withdrawal is ₦300,000");
      return;
    }

    setIsVerifying(true);

    try {
      // Verify authentication code
      const { data, error } = await supabase.functions.invoke('verify-auth-code', {
        body: {
          code: formData.bpcCode,
          userEmail: user?.email || 'user@example.com',
          amount: amount
        }
      });

      if (error || !data?.success) {
        toast.error("Invalid authentication code", {
          description: "Please check the code and try again"
        });
        return;
      }

      // Process withdrawal using AuthContext
      const { withdraw } = useAuth();
      const success = withdraw(amount);
      
      if (success) {
        toast.success(`Withdrawal Successful!`, {
          description: `₦${amount.toLocaleString()} has been processed for withdrawal`
        });
        
        // Reset form
        setFormData({
          accountName: "",
          accountNumber: "",
          bankName: "",
          amount: "",
          bpcCode: ""
        });
        setIsAuthCodeSent(false);
        
        // Navigate to success page after a short delay
        setTimeout(() => {
          navigate("/withdrawal-success");
        }, 2000);
      }
    } catch (error) {
      console.error('Error verifying auth code:', error);
      toast.error("Failed to verify authentication code");
    } finally {
      setIsVerifying(false);
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Withdraw Funds</h1>
        </div>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Banknote className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-xl text-gray-900">Withdrawal Form</CardTitle>
            <CardDescription className="text-gray-600">
              Fill in your bank details to withdraw funds
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleWithdraw} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountName" className="text-gray-700">Account Name</Label>
                <Input
                  id="accountName"
                  type="text"
                  placeholder="Enter your account name"
                  value={formData.accountName}
                  onChange={(e) => handleInputChange("accountName", e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber" className="text-gray-700">Account Number</Label>
                <Input
                  id="accountNumber"
                  type="text"
                  placeholder="Enter your account number"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-gray-700">Bank Name</Label>
                <Input
                  id="bankName"
                  type="text"
                  placeholder="Enter your bank name"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-gray-700">Amount to Withdraw</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  min="1"
                  max="300000"
                  required
                />
                <p className="text-sm text-gray-500">
                  Available Balance: ₦{balance.toLocaleString()} | Max: ₦300,000
                </p>
              </div>

              {/* Send Authentication Code Button */}
              <div className="space-y-3">
                <Button
                  type="button"
                  onClick={sendAuthCode}
                  disabled={isSendingCode || isAuthCodeSent}
                  className={`w-full py-3 rounded-lg transition-colors ${
                    isAuthCodeSent 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-orange-600 hover:bg-orange-700'
                  } text-white`}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSendingCode 
                    ? 'Sending Code...' 
                    : isAuthCodeSent 
                      ? 'Code Sent ✓' 
                      : 'Send Authentication Code'
                  }
                </Button>
                {isAuthCodeSent && (
                  <p className="text-sm text-green-600 text-center">
                    Authentication code sent to admin email
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bpcCode" className="text-gray-700">
                  Authentication Code
                </Label>
                <Input
                  id="bpcCode"
                  type="text"
                  placeholder="Enter the 6-digit authentication code"
                  value={formData.bpcCode}
                  onChange={(e) => handleInputChange("bpcCode", e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  maxLength={6}
                  disabled={!isAuthCodeSent}
                  required
                />
                <p className="text-sm text-gray-500">
                  Enter the 6-digit code sent to the admin email
                </p>
                {!user?.hasPurchasedBPC && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-600 mb-2">
                      ⚠️ You need to purchase a BPC Code first!
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => navigate("/buy-bpc")}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Get BPC Code
                    </Button>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={!isAuthCodeSent || isVerifying}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? 'Verifying...' : 'Submit Withdrawal Request'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
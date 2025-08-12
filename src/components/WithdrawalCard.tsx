
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const WithdrawalCard = () => {
  const { user, withdraw, balance } = useAuth();
  const [amount, setAmount] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");

  const handleWithdraw = () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!accountNumber || !accountName || !bankName) {
      toast.error("Please complete all bank details");
      return;
    }
    
    if (accountNumber.length < 10) {
      toast.error("Please enter a valid account number");
      return;
    }

    const withdrawalAmount = Number(amount);
    if (withdrawalAmount <= 0) {
      toast.error("Please enter an amount greater than zero");
      return;
    }

    const success = withdraw(withdrawalAmount);
    if (success) {
      setAmount("");
      toast.success(`Your withdrawal of ₦${withdrawalAmount.toLocaleString()} is being processed`);
    }
  };

  return (
    <Card className="shadow-md border-bluepay-100">
      <CardHeader className="bg-bluepay-500 text-white rounded-t-lg pb-6">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          Withdraw Funds
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col">
          {!user?.hasPurchasedBPC ? (
            <div className="flex items-start space-x-2 p-3 rounded-md bg-yellow-50 border border-yellow-200 mb-4">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <p className="text-sm text-yellow-700">
                You need to purchase a BPC code before you can withdraw funds
              </p>
            </div>
          ) : (
            <div className="flex items-start space-x-2 p-3 rounded-md bg-green-50 border border-green-200 mb-4">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <p className="text-sm text-green-700">
                BPC activated. You can now withdraw funds to your bank account
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={!user?.hasPurchasedBPC}
                type="number"
                className="font-mono"
              />
              <p className="text-xs text-gray-500">Available balance: ₦{balance.toLocaleString()}</p>
            </div>
            
            <div className="pt-2 border-t">
              <h3 className="text-sm font-medium mb-3">Bank Details</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    disabled={!user?.hasPurchasedBPC}
                    className="font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    placeholder="Enter account name"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    disabled={!user?.hasPurchasedBPC}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    placeholder="Enter bank name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    disabled={!user?.hasPurchasedBPC}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 border-t">
        <Button 
          className="w-full bg-bluepay-500 hover:bg-bluepay-600"
          disabled={!user?.hasPurchasedBPC}
          onClick={handleWithdraw}
        >
          Withdraw Funds
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WithdrawalCard;

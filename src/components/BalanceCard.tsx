
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { EyeIcon, EyeOffIcon, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const BalanceCard = () => {
  const { balance } = useAuth();
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <Card className="shadow-md border-bluepay-100">
      <CardHeader className="bg-bluepay-500 text-white rounded-t-lg pb-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">Account Balance</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white hover:bg-bluepay-400 hover:text-white"
            onClick={() => setHideBalance(!hideBalance)}
          >
            {hideBalance ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
          </Button>
        </div>
        <CardDescription className="text-blue-100">Available funds</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {hideBalance ? "₦••••••" : `₦${balance.toLocaleString()}`}
          </div>
          <div className="flex items-center text-sm text-green-600 font-medium">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>Available for withdrawal</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;

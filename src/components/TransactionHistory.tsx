
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { ClipboardCheck, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  type: "bpc" | "withdrawal" | "deposit";
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  description: string;
}

const TransactionHistory = () => {
  const { user, transactions } = useAuth();

  return (
    <Card className="shadow-md border-bluepay-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
        <CardDescription>Your transaction history</CardDescription>
      </CardHeader>
      <CardContent>
        {(!user?.hasPurchasedBPC && (!transactions || transactions.length === 0)) ? (
          <div className="text-center py-8 text-gray-500">
            <p>Purchase a BPC code to enable transactions.</p>
          </div>
        ) : transactions && transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="mr-3">
                  {transaction.type === "bpc" && (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <ClipboardCheck className="h-5 w-5 text-bluepay-500" />
                    </div>
                  )}
                  {transaction.type === "withdrawal" && (
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <ArrowUpRight className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                  {transaction.type === "deposit" && (
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <ArrowDownLeft className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.type === "withdrawal" ? "text-red-600" : transaction.type === "deposit" ? "text-green-600" : "text-blue-600"}`}>
                    {transaction.type === "withdrawal" ? "-" : transaction.type === "deposit" ? "+" : ""}₦{transaction.amount.toLocaleString()}
                  </p>
                  <div className="mt-1">
                    <Badge 
                      variant={transaction.status === "completed" ? "default" : transaction.status === "pending" ? "outline" : "destructive"}
                      className={`text-xs ${transaction.status === "completed" ? "bg-green-100 text-green-800 hover:bg-green-100" : transaction.status === "pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200" : ""}`}
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Your recent transactions will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;

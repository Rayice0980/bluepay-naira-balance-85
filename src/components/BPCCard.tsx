
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { AlertCircle, ExternalLink, Clock } from "lucide-react";

const BPCCard = () => {
  const { user, purchaseBPC } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds (60 * 60)
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    let timerId: number;
    
    if (isVerifying && timeRemaining > 0) {
      timerId = window.setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isVerifying) {
      handlePurchase();
    }
    
    return () => {
      window.clearInterval(timerId);
    };
  }, [timeRemaining, isVerifying]);

  const startVerification = () => {
    setIsVerifying(true);
  };

  const handlePurchase = () => {
    setIsDialogOpen(false);
    setIsVerifying(false);
    setTimeRemaining(3600); // Reset to 1 hour
    purchaseBPC();
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="shadow-md border-bluepay-100">
      <CardHeader className="bg-bluepay-500 text-white rounded-t-lg pb-6">
        <CardTitle className="text-xl font-semibold">BPC Code</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 mb-4">
            A BPC code is required for all withdrawals. Purchase below.
          </p>
          <p className="text-md font-medium mb-2">
            Cost: <span className="font-bold">₦8,000</span>
          </p>
          <p className="text-md font-medium mb-2">
            Status: {user?.hasPurchasedBPC ? (
              <span className="text-green-500 font-bold">Activated</span>
            ) : (
              <span className="text-red-500 font-bold">Not Activated</span>
            )}
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 border-t">
        {user?.hasPurchasedBPC ? (
          <Button 
            className="w-full bg-bluepay-500 hover:bg-bluepay-600"
            disabled={true}
          >
            Already Purchased
          </Button>
        ) : (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-bluepay-500 hover:bg-bluepay-600">
                Purchase BPC Code
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Purchase BPC Code</DialogTitle>
                <DialogDescription>
                  Make a payment of ₦8,000 to the account below to activate your BPC code.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="rounded-md bg-blue-50 p-4 border border-blue-200">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-800">Payment Instructions</h3>
                      <div className="mt-2 text-sm text-blue-700 space-y-1">
                        <p>Please make a bank transfer of ₦8,000 to:</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-sm font-medium">Account Number:</div>
                  <div className="col-span-2 font-mono bg-gray-100 p-2 rounded">5770768256</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-sm font-medium">Bank Name:</div>
                  <div className="col-span-2 bg-gray-100 p-2 rounded">MONIE POINT</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-sm font-medium">Account Name:</div>
                  <div className="col-span-2 bg-gray-100 p-2 rounded">ABDULAZEEZ JOLAADE YUSUF</div>
                </div>
                
                <div className="rounded-md bg-amber-50 p-4 border border-amber-200 mt-2">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                    <div>
                      <h3 className="text-sm font-medium text-amber-800">Verification Required</h3>
                      <div className="mt-1 text-sm text-amber-700">
                        <p className="mb-2">After payment, please send a screenshot of your payment confirmation to our agent via WhatsApp before activating your BPC code.</p>
                        <a 
                          href="https://wa.me/08022972593" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors"
                        >
                          Send Payment Proof via WhatsApp <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-3">
                {isVerifying ? (
                  <div className="w-full flex flex-col space-y-3">
                    <div className="flex items-center justify-center bg-gray-100 p-3 rounded-lg">
                      <Clock className="h-5 w-5 text-bluepay-500 mr-2 animate-pulse" />
                      <div className="text-center">
                        <div className="text-lg font-semibold">{formatTime(timeRemaining)}</div>
                        <div className="text-sm text-gray-500">Wait while our agent verifies your payment</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-sm text-gray-500">
                      After sending proof, click "Start Verification"
                    </div>
                    <Button 
                      onClick={startVerification}
                      className="bg-bluepay-500 hover:bg-bluepay-600"
                    >
                      Start Verification
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default BPCCard;

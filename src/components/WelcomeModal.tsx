import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, AlertTriangle } from "lucide-react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const WelcomeModal = ({ isOpen, onClose, username }: WelcomeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-3xl p-8 border-0 shadow-2xl">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Welcome heading */}
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Welcome
        </h1>

        {/* Welcome message */}
        <p className="text-lg text-center text-gray-700 mb-6 leading-relaxed">
          <span className="text-bluepay-500 font-semibold">{username}</span>
          , you have been given <span className="font-bold">₦500,000</span> to withdraw every day. Don't click on the reset button until tomorrow, else you will be banned. Join group{" "}
          <a href="#" className="text-bluepay-500 underline hover:text-bluepay-600">
            Here
          </a>
        </p>

        {/* Security notice */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-yellow-800 font-semibold mb-1">
                Important Security Notice:
              </p>
              <p className="text-yellow-700 text-sm leading-relaxed">
                Never get BPC codes from anyone apart from this official site. Beware of scams and protect your account.
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-4">
          <Button
            onClick={onClose}
            className="flex-1 h-14 text-lg font-semibold bg-red-500 hover:bg-red-600 text-white rounded-2xl transition-all duration-200 hover:scale-105"
          >
            Close
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 h-14 text-lg font-semibold bg-bluepay-500 hover:bg-bluepay-600 text-white rounded-2xl transition-all duration-200 hover:scale-105"
          >
            Reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
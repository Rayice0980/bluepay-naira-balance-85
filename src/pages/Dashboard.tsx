import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  RotateCcw, 
  Database, 
  Radio, 
  HelpCircle, 
  Users, 
  Package 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { balance } = useAuth();
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);

  const quickActions = [
    { icon: RotateCcw, label: "Reset", onClick: () => toast.info("Reset feature coming soon!") },
    { icon: Database, label: "Buy BPC", onClick: () => navigate("/buy-bpc") },
    { icon: Radio, label: "Airtime", onClick: () => toast.info("Airtime feature coming soon!") },
    { icon: HelpCircle, label: "Contact", onClick: () => navigate("/contact") },
    { icon: Users, label: "Group", onClick: () => toast.info("Group feature coming soon!") },
    { icon: Package, label: "Cubical", onClick: () => toast.info("Cubical feature coming soon!") },
  ];

  const names = [
    "Mr. Adebayo K.", "Jennifer A.", "Chioma F.", "Chinedu A.", "Grace P.",
    "Amina Y.", "Blessing N.", "Emeka O.", "Aisha M.", "David K.",
    "Fatima B.", "Ibrahim S.", "Mary T.", "Joseph N.", "Kemi L.",
    "Ahmed R.", "Ngozi E.", "Victor I.", "Hauwa M.", "Samuel A."
  ];

  const locations = [
    "Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt", "Benin", "Kaduna",
    "Jos", "Ilorin", "Aba", "Onitsha", "Warri", "Calabar", "Enugu", "Sokoto",
    "Minna", "Bauchi", "Gombe", "Yola", "Makurdi"
  ];

  const amounts = ["₦100,000", "₦150,000", "₦200,000", "₦250,000", "₦300,000"];

  const messages = [
    "Am so grateful after been scammed lot of times on this same update i can't believe i withdrawal oh my god",
    "This thing legit pass my imagination. Money just land without stress!",
    "This thing shock me! I been doubt am but now my account dey smile. BluePay na real deal!",
    "Am just happy this thing dey like magic for my eye withdrawal just like that am lost is thought anything like this is a scam",
    "Chai! This thing shock me o! Money just land for my account like say na dream. BluePay no be scam!",
    "After plenty scam wey I don experience, this one just give me hope again. Money complete for account!",
    "This BluePay don change my story. From doubt to testimony, money complete for account!",
    "This app na real business. No scam, no story. Money land for account correct!",
    "After so many fake platforms, this one don restore my faith. Withdrawal successful!",
    "This BluePay don surprise me. I thought na scam but money complete!"
  ];

  const generateRandomTestimonials = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    return Array.from({ length: 10 }, (_, index) => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      // Randomize dates between today and yesterday
      const randomDate = Math.random() > 0.5 ? today : yesterday;
      const dateString = randomDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });

      return {
        name: randomName,
        location: randomLocation,
        amount: randomAmount,
        date: dateString,
        message: randomMessage
      };
    });
  };

  useEffect(() => {
    // Generate initial testimonials
    setTestimonials(generateRandomTestimonials());

    // Set up interval to update every 24 hours
    const interval = setInterval(() => {
      setTestimonials(generateRandomTestimonials());
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Balance Card */}
        <Card className="bg-bluepay-500 text-white p-6 rounded-3xl">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-blue-100 text-sm mb-1">Available Balance</p>
              <p className="text-3xl font-bold">₦{balance.toLocaleString()}.00</p>
            </div>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white text-bluepay-500 hover:bg-blue-50 rounded-full px-6"
              onClick={() => navigate("/withdraw")}
            >
              Withdraw
            </Button>
          </div>
          <p className="text-blue-100 text-sm">Maximum daily withdrawal: ₦300,000.00</p>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50"
              onClick={action.onClick}
            >
              <action.icon className="h-6 w-6 text-gray-600" />
              <span className="text-sm text-gray-700">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Transaction History Button */}
        <Button 
          className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-2xl py-4 text-lg"
          onClick={() => navigate("/transactions")}
        >
          Transaction History
        </Button>

        {/* Recent Successful Withdrawals */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Successful Withdrawals</h2>
          
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{testimonial.amount}</p>
                    <p className="text-xs text-gray-500">{testimonial.date}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{testimonial.message}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
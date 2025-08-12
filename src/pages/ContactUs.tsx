import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, Clock } from "lucide-react";

const ContactUs = () => {
  const handleWhatsAppContact = () => {
    const phoneNumber = "2348022972593";
    const message = "Hello, I need support with BluePay";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600">We're here to help! Get in touch with our support team.</p>
        </div>

        {/* Main Contact Card */}
        <Card className="bg-white border-blue-100 shadow-lg">
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-bluepay-500" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">WhatsApp Support</h2>
              <p className="text-gray-600">Get instant help through WhatsApp</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-bluepay-600 font-medium text-lg">+234 802 297 2593</p>
            </div>

            <Button 
              onClick={handleWhatsAppContact}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-4 text-lg font-medium flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </div>
        </Card>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white border-blue-100 p-4 text-center">
            <Phone className="h-6 w-6 text-bluepay-500 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Phone</h3>
            <p className="text-sm text-gray-600">+234 802 297 2593</p>
          </Card>

          <Card className="bg-white border-blue-100 p-4 text-center">
            <Mail className="h-6 w-6 text-bluepay-500 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Email</h3>
            <p className="text-sm text-gray-600">azeezy232@gmail.com</p>
          </Card>

          <Card className="bg-white border-blue-100 p-4 text-center">
            <Clock className="h-6 w-6 text-bluepay-500 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Hours</h3>
            <p className="text-sm text-gray-600">24/7 Support</p>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-800">How long does withdrawal take?</h4>
                <p className="text-sm text-gray-600">Withdrawals are processed instantly once your BPC is confirmed.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">What is the minimum withdrawal amount?</h4>
                <p className="text-sm text-gray-600">The minimum withdrawal amount is ₦1,000.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Is BluePay secure?</h4>
                <p className="text-sm text-gray-600">Yes, we use bank-level security to protect your funds and data.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ContactUs;
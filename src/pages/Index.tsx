import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-bluepay-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12">
                <h1 className="text-4xl md:text-5xl font-bold text-bluepay-800 mb-4">
                  Fast and Secure Digital Payments in Naira
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Experience the best payment solution in Nigeria with BluePay. 
                  Withdraw funds easily with our secure BPC code system.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/register">
                    <Button className="w-full sm:w-auto bg-bluepay-500 hover:bg-bluepay-600 text-white px-8 py-2.5">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="w-full sm:w-auto border-bluepay-500 text-bluepay-500 hover:bg-bluepay-50 px-8 py-2.5">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 mt-12 md:mt-0">
                <div className="bg-white p-8 rounded-xl shadow-2xl border border-bluepay-100">
                  <div className="bg-bluepay-500 rounded-lg p-6 text-white mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm opacity-80">Available Balance</span>
                      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="font-bold text-xs">BP</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">₦500,000.00</div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-500">BPC Code Status</span>
                        <span className="text-red-500 font-medium">Not Activated</span>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Withdrawal Access</span>
                        <span className="text-red-500 font-medium">Locked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose BluePay</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-bluepay-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bluepay-500">
                    <path d="M20.91 8.84L8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a1.93 1.93 0 0 0-.97 1.68v4.8a2 2 0 0 0 1 1.74l7.3 4.05a2 2 0 0 0 2 0l4.51-2.5"></path>
                    <path d="M19.84 15.87a2 2 0 0 1-2.54-2.63L22 8"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                <p className="text-gray-600">
                  All transactions are protected with the latest security measures, including our BPC code system.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-bluepay-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bluepay-500">
                    <path d="M6 9.5V6.2c0-1 .8-1.8 1.8-1.8h8.4c1 0 1.8.8 1.8 1.8v11.4c0 1-.8 1.8-1.8 1.8h-8.4c-1 0-1.8-.8-1.8-1.8V14.5"></path>
                    <path d="M9 5v14"></path>
                    <path d="M12 9v6"></path>
                    <path d="M13 17v2"></path>
                    <path d="M13 5v2"></path>
                    <path d="M18 8h4"></path>
                    <path d="M6 12h4"></path>
                    <path d="M2 8h4"></path>
                    <path d="M2 16h4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Withdrawals</h3>
                <p className="text-gray-600">
                  Get your money quickly with our streamlined withdrawal process, once your BPC code is activated.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-bluepay-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bluepay-500">
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Reliable Service</h3>
                <p className="text-gray-600">
                  Count on our platform to be available when you need it, with 24/7 support for all your transactions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-bluepay-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Using BluePay?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who trust BluePay for their financial transactions.
            </p>
            <Link to="/register">
              <Button className="bg-white text-bluepay-500 hover:bg-gray-100 px-8 py-3 text-lg">
                Create Account Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Index;
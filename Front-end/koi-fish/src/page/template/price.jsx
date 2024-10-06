import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const PricingComponent = () => {
  const [activeTab, setActiveTab] = useState("monthly");

  const plans = {
    monthly: [
      {
        name: "Basic",
        price: "$19",
        features: ["1 User", "10GB Storage", "Email Support"],
        promotion: "Free 7-day trial"
      },
      {
        name: "Pro",
        price: "$49",
        features: ["5 Users", "50GB Storage", "Priority Support", "Advanced Analytics"],
        promotion: "20% off first 3 months"
      },
      {
        name: "Enterprise",
        price: "$99",
        features: ["Unlimited Users", "1TB Storage", "24/7 Support", "Custom Solutions"],
        promotion: "Free implementation"
      }
    ],
    annually: [
      {
        name: "Basic",
        price: "$190",
        features: ["1 User", "10GB Storage", "Email Support"],
        promotion: "Save $38 annually"
      },
      {
        name: "Pro",
        price: "$490",
        features: ["5 Users", "50GB Storage", "Priority Support", "Advanced Analytics"],
        promotion: "Save $98 annually"
      },
      {
        name: "Enterprise",
        price: "$990",
        features: ["Unlimited Users", "1TB Storage", "24/7 Support", "Custom Solutions"],
        promotion: "Save $198 annually"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeTab === "monthly"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
                onClick={() => setActiveTab("monthly")}
                aria-label="Monthly pricing"
              >
                Monthly
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeTab === "annually"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
                onClick={() => setActiveTab("annually")}
                aria-label="Annual pricing"
              >
                Annually
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans[activeTab].map((plan, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm font-normal">/{activeTab === "monthly" ? "mo" : "yr"}</span></p>
                  <ul className="mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center mb-3">
                        <FaCheck className="text-red-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-red-600 font-medium mb-8">{plan.promotion}</p>
                  <button
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors duration-300"
                    aria-label={`Choose ${plan.name} plan`}
                  >
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;
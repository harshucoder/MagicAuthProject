"use client";
import React from 'react';
import Button from '../UI/Button';
import { 
  FaDatabase, 
  FaShieldAlt, 
  FaEnvelope, 
  FaCode, 
  FaInfinity,
  FaServer,
  FaRocket,
  FaLock,
  FaUserCog
} from 'react-icons/fa';

const PricingSection = () => {
  const plans = [
    {
      name: "Free Forever",
      price: "$0",
      period: "/month",
      features: [
        { icon: <FaInfinity className="text-purple-400" />, text: "Unlimited users" },
        { icon: <FaDatabase className="text-purple-400" />, text: "Bring your own database" },
        { icon: <FaEnvelope className="text-purple-400" />, text: "Custom SMTP integration" },
        { icon: <FaCode className="text-purple-400" />, text: "Easy API integration" }
      ],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      features: [
        { icon: <FaServer className="text-purple-400" />, text: "Priority API access" },
        { icon: <FaShieldAlt className="text-purple-400" />, text: "Advanced security controls" },
        { icon: <FaUserCog className="text-purple-400" />, text: "Custom roles & permissions" },
        { icon: <FaRocket className="text-purple-400" />, text: "Premium support" }
      ],
      cta: "Upgrade Now",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: [
        { icon: <FaLock className="text-purple-400" />, text: "Dedicated infrastructure" },
        { icon: <FaShieldAlt className="text-purple-400" />, text: "SOC2 compliance" },
        { icon: <FaServer className="text-purple-400" />, text: "On-premise deployment" },
        { icon: <FaUserCog className="text-purple-400" />, text: "Dedicated account manager" }
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <section className="w-full py-20 bg-[#0B0121]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pricing That <span className="text-purple-400">Scales With You</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Start free, upgrade when you need. All plans include our core authentication features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-transparent border-2 rounded-[30px] p-8 shadow-[0_2px_10px_rgba(138,43,226,${plan.highlight ? '1' : '0.3'})] 
              ${plan.highlight ? 'border-purple-400 scale-105' : 'border-white/20'} transition-all`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <div className="flex items-end mt-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-3 mt-1">{feature.icon}</span>
                    <span className="text-gray-300">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <Button
                text={plan.cta}
                link={plan.name === "Enterprise" ? "/contact" : "/client/register"}
                style={`w-full ${plan.highlight ? 
                  'bg-purple-500 hover:bg-purple-600 text-white' : 
                  'bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0B0121]'} 
                  py-3 rounded-[70px] font-normal transition-all flex items-center justify-center`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
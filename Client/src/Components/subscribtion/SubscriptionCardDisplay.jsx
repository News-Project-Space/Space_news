import React from "react";
import { Link } from "react-router-dom";
import { FileText, Edit, Bookmark, Users, TrendingUp, Award } from "lucide-react";

const SubscriptionCard = ({ plan, featured = false }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border ${
        featured ? "border-2 border-[#FDB827] scale-105" : "border-[#F1F1F1]"
      }`}
    >
      {featured && (
        <div className="bg-[#FDB827] text-[#23120B] py-1 px-4 text-center font-semibold">
          Most Popular
        </div>
      )}
      <div className="p-6 border-b border-[#F1F1F1]">
        <h3 className={`text-2xl font-bold ${featured ? "text-[#FDB827]" : "text-[#21209C]"}`}>
          {plan.title}
        </h3>
        <p className="mt-2 text-sm text-[#23120B]">{plan.description}</p>
      </div>
      <div className="p-6">
        <div className="flex items-baseline mb-6">
          <span className="text-3xl font-bold text-[#23120B]">{plan.price}</span>
          <span className="ml-2 text-sm text-gray-600">{plan.duration}</span>
        </div>
        <ul className="mt-4 space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mt-1">
                {feature.icon}
              </span>
              <div className="ml-3">
                <span className="font-medium text-[#23120B]">{feature.title}</span>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link
          to="/PaymentPage"
          state={{
            id: plan._id,
            title: plan.title,
            price: plan.price,
            duration: plan.duration,
          }}
          className="block w-full"
        >
          <button 
            className={`w-full py-3 px-6 rounded-md font-semibold transition-all duration-300 ${
              featured 
                ? "bg-[#FDB827] text-[#23120B] hover:bg-opacity-90" 
                : "bg-[#21209C] text-white hover:bg-opacity-90"
            }`}
          >
            Start Publishing
          </button>
        </Link>
      </div>
    </div>
  );
};

const SubscriptionCardDisplay = () => {
  const subscriptionCards = [
    {
      _id: "1",
      title: "Freelance Writer",
      description: "Perfect for independent journalists building their portfolio.",
      price: "$9.99",
      duration: "per month",
      features: [
        {
          icon: <FileText size={18} className="text-[#21209C]" />,
          title: "Article Publishing",
          description: "Publish up to 10 articles per month"
        },
        {
          icon: <Edit size={18} className="text-[#21209C]" />,
          title: "Basic Editor Tools",
          description: "Access to essential formatting and editing tools"
        },
        {
          icon: <Bookmark size={18} className="text-[#21209C]" />,
          title: "Portfolio Page",
          description: "Create your professional journalist profile"
        },
        {
          icon: <TrendingUp size={18} className="text-[#21209C]" />,
          title: "Basic Analytics",
          description: "Track views and engagement on your articles"
        }
      ],
    },
    {
      _id: "2",
      title: "Professional",
      description: "For serious journalists who want to maximize their reach and impact.",
      price: "$24.99",
      duration: "per month",
      features: [
        {
          icon: <FileText size={18} className="text-[#FDB827]" />,
          title: "Unlimited Publishing",
          description: "No limits on the number of articles you can publish"
        },
        {
          icon: <Award size={18} className="text-[#FDB827]" />,
          title: "Featured Content",
          description: "Get your work featured in spotlight sections"
        },
        {
          icon: <TrendingUp size={18} className="text-[#FDB827]" />,
          title: "Advanced Analytics",
          description: "Detailed reader demographics and engagement metrics"
        },
        {
          icon: <Edit size={18} className="text-[#FDB827]" />,
          title: "Premium Editing Suite",
          description: "Access to advanced editing tools and templates"
        },
        {
          icon: <Users size={18} className="text-[#FDB827]" />,
          title: "Collaboration Tools",
          description: "Work with editors and co-authors seamlessly"
        }
      ],
    },
    {
      _id: "3",
      title: "Newsroom",
      description: "Designed for publications and media organizations with multiple contributors.",
      price: "$79.99",
      duration: "per month",
      features: [
        {
          icon: <Users size={18} className="text-[#21209C]" />,
          title: "Team Management",
          description: "Add up to 15 journalist accounts under one subscription"
        },
        {
          icon: <Edit size={18} className="text-[#21209C]" />,
          title: "Editorial Workflow",
          description: "Complete publishing pipeline with approval processes"
        },
        {
          icon: <FileText size={18} className="text-[#21209C]" />,
          title: "Content Distribution",
          description: "Automatic syndication to partner networks"
        },
        {
          icon: <TrendingUp size={18} className="text-[#21209C]" />,
          title: "Enterprise Analytics",
          description: "Comprehensive reporting dashboard and insights"
        },
        {
          icon: <Award size={18} className="text-[#21209C]" />,
          title: "Branded Experience",
          description: "Custom branding and domain options"
        }
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4 bg-[#F1F1F1]">
      <div className="text-center max-w-2xl mb-16">
        <h1 className="text-4xl font-bold text-[#23120B] mb-4">
          Publish Your Voice
        </h1>
        <p className="text-lg text-[#23120B] opacity-80">
          Join thousands of journalists sharing their stories, investigations, and perspectives with engaged readers worldwide.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <SubscriptionCard plan={subscriptionCards[0]} />
        <SubscriptionCard plan={subscriptionCards[1]} featured={true} />
        <SubscriptionCard plan={subscriptionCards[2]} />
      </div>
      
      
    </div>
  );
};

export default SubscriptionCardDisplay;
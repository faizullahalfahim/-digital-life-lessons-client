import React from 'react';
import { Lightbulb, ShieldCheck, TrendingUp, Users } from 'lucide-react';

const WhyLearningFromLife = () => {
  const benefits = [
    {
      id: 1,
      icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
      title: "Self-Awareness",
      description: "Life lessons help you understand your patterns, strengths, and areas for growth more deeply."
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      title: "Resilience",
      description: "Learning from past mistakes builds the mental toughness needed to face future challenges."
    },
    {
      id: 3,
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      title: "Accelerated Growth",
      description: "By internalizing experiences, you avoid repeating errors and fast-track your personal progress."
    },
    {
      id: 4,
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Empowering Others",
      description: "Sharing your journey provides a roadmap for others, creating a community of collective wisdom."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Why Learning From Life Matters
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Experience is the best teacher, but only if we take the time to listen. 
            Transforming your journey into wisdom is the ultimate power.
          </p>
          <div className="w-24 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div 
              key={benefit.id} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-transform duration-300 shadow-inner">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearningFromLife;
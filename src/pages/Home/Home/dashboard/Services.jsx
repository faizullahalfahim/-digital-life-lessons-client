import React from 'react';
import { Video, Award, Users, Map, Clock } from 'lucide-react';

const serviceCards = [
    {
        title: "Expert-Led Video Courses",
        description: "Access high-quality, practical video content developed by industry professionals. Learn at your own pace with downloadable resources.",
        icon: Video,
        color: "text-blue-600 bg-blue-100"
    },
    {
        title: "Personalized Learning Paths",
        description: "Get a customized roadmap based on your current skill level and career goals. We guide you from beginner to expert.",
        icon: Map,
        color: "text-green-600 bg-green-100"
    },
    {
        title: "Live Mentorship & Community",
        description: "Engage in live Q&A sessions with experts and connect with a supportive community of peers for continuous feedback and motivation.",
        icon: Users,
        color: "text-purple-600 bg-purple-100"
    },
    {
        title: "Practical Skill Assessments",
        description: "Reinforce your learning with hands-on projects, real-world case studies, and practical assessments leading to verified certification.",
        icon: Award,
        color: "text-red-600 bg-red-100"
    },
    {
        title: "Lifetime Resource Access",
        description: "Enjoy perpetual access to all purchased courses and any future updates or resources added to those specific topics.",
        icon: Clock,
        color: "text-yellow-600 bg-yellow-100"
    },
];

const Services = () => {
    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            
            {/* 1. Main Header and Introduction */}
            <header className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                    Our Services: What We Offer
                </h1>
                <p className="text-xl text-gray-600">
                    We are dedicated to providing comprehensive resources that cover every aspect of digital upskilling, ensuring you are prepared for tomorrow's challenges.
                </p>
            </header>

            {/* 2. Services Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceCards.map((service, index) => (
                    <div 
                        key={index} 
                        className="bg-gray-50 p-8 rounded-xl shadow-lg border-t-4 border-primary/50 transition duration-300 hover:shadow-2xl hover:scale-[1.02]"
                    >
                        <div className={`p-3 rounded-xl inline-block mb-4 ${service.color}`}>
                            <service.icon className="h-7 w-7" />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            {service.title}
                        </h2>
                        <p className="text-gray-600 text-lg">
                            {service.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* 3. Footer CTA Section */}
            <section className="max-w-4xl mx-auto text-center mt-16 p-10 bg-blue-50 rounded-xl border border-blue-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Ready to Transform Your Skills?
                </h2>
                <p className="text-gray-700 mb-6">
                    Dive into our full catalog and select the learning path that's right for you.
                </p>
                <a 
                    href="/pricing" 
                    className="btn btn-lg btn-primary text-white font-semibold shadow-lg hover:bg-blue-700"
                >
                    Explore Pricing Plans
                </a>
            </section>
            
        </div>
    );
};

export default Services;
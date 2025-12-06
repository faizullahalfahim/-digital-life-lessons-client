import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            
            {/* 1. Main Header and Introduction */}
            <header className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                    About Digital Life Lessons
                </h1>
                <p className="text-xl text-gray-600">
                    We believe everyone needs **practical and real-world education** to thrive and succeed in the digital economy.
                </p>
            </header>

            {/* 2. Mission and Vision Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                
                {/* Mission Card */}
                <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
                    <h2 className="text-3xl font-bold text-blue-600 mb-3">Our Mission</h2>
                    <p className="text-gray-700 text-lg">
                        To empower learners with the essential practical skills and knowledge required to build a life in the digital age. We craft courses that prioritize **application over theory**.
                    </p>
                </div>
                
                {/* Vision Card */}
                <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-green-500">
                    <h2 className="text-3xl font-bold text-green-600 mb-3">Our Vision</h2>
                    <p className="text-gray-700 text-lg">
                        To create a world where education is accessible, relevant, and instrumental to every individual’s future. We aim to be the **premier platform for digital life skills**.
                    </p>
                </div>
            </div>

            {/* 3. Who We Are Section */}
            <section className="max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Who We Are
                </h2>
                <div className="bg-white p-8 rounded-xl shadow-xl">
                    <p className="text-gray-700 text-lg leading-relaxed">
                        **Digital Life Lessons** was founded by a dedicated team of educators, technologists, and subject matter experts. Our team works tirelessly to ensure that the content in every course is accurate, modern, and highly practical. Our goal is not just to teach, but to help you **achieve tangible success** in your digital life.
                    </p>
                </div>
            </section>

            {/* 4. Core Values */}
            <section className="max-w-6xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Our Core Values
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    
                    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <span className="text-5xl text-red-500 mb-4 block">💡</span>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Relevance</h3>
                        <p className="text-gray-600">We only teach skills that are truly in demand in today's professional landscape.</p>
                    </div>
                    
                    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <span className="text-5xl text-yellow-500 mb-4 block">🤝</span>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Accessibility</h3>
                        <p className="text-gray-600">Ensuring high-quality education is affordable and available to everyone, everywhere.</p>
                    </div>
                    
                    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <span className="text-5xl text-teal-500 mb-4 block">📈</span>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Growth</h3>
                        <p className="text-gray-600">We are committed to the continuous improvement of our platform and our learners.</p>
                    </div>
                </div>
            </section>

            {/* 5. Call to Action (CTA) */}
            <div className="max-w-4xl mx-auto text-center bg-blue-600 p-10 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-4">
                    Start Your Learning Journey Today!
                </h2>
                <p className="text-white mb-6">
                    Browse our extensive course catalog and unlock the next level of your digital life.
                </p>
                <a 
                    href="/lessons" 
                    className="btn btn-warning btn-lg text-white font-semibold shadow-lg hover:bg-yellow-500"
                >
                    View Course Catalog
                </a>
            </div>
            
        </div>
    );
};

export default AboutUs;
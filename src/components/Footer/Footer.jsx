import React from "react";
import { Twitter, Facebook, Linkedin, Github } from "lucide-react";
import { Link } from "react-router";
import Logo from "../Logo/Logo";

const Footer = () => {
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/" },
        { name: "Lessons", path: "/lessons" },
        { name: "Services", path: "/services" },
        { name: "Dashboard", path: "/dashboard" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "FAQ", path: "/faq" },
        { name: "Help Center", path: "/help" },
        { name: "Sitemap", path: "/sitemap" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookies" },
      ],
    },
  ];

  const socialIcons = [
    { icon: Facebook, href: "https://facebook.com", title: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", title: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", title: "LinkedIn" },
    { icon: Github, href: "https://github.com", title: "GitHub" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8 mb-8">
          <div className="col-span-2 md:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <div className="text-2xl font-bold text-white"><Logo> </Logo></div>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm">
              Learn, build, and grow your skills with our curated courses and
              resources.
            </p>

            <div className="flex space-x-4 pt-2">
              {socialIcons.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition duration-300"
                  title={item.title}
                >
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-white uppercase tracking-wider border-b-2 border-blue-500 inline-block pb-1">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-white transition duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {year} ProjectName. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

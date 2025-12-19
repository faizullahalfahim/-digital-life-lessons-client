import React from "react";
import { Facebook, Linkedin, Github, X } from "lucide-react";
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
        { name: "My Favorites", path: "/dashboard/my-favorites" },
        { name: "Dashboard", path: "/dashboard" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "FAQ", path: "/faq" },
        { name: "Help Center", path: "/help" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
  ];

  const socialIcons = [
    { icon: Facebook, href: "https://facebook.com", title: "Facebook", hover: "hover:text-blue-600" },
    { icon: X, href: "https://x.com", title: "X (Twitter)", hover: "hover:text-slate-200" }, // X লোগো
    { icon: Linkedin, href: "https://linkedin.com", title: "LinkedIn", hover: "hover:text-blue-500" },
    { icon: Github, href: "https://github.com", title: "GitHub", hover: "hover:text-white" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900">
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 border-b border-slate-800 pb-12 mb-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Empowering individuals through shared wisdom and life-changing lessons. 
              Join our community to grow, learn, and excel.
            </p>

            <div className="flex space-x-5 pt-2">
              {socialIcons.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-slate-500 transition-all duration-300 transform hover:-translate-y-1 ${item.hover}`}
                  title={item.title}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-5 col-span-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-sm text-slate-500 hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
          <p className="text-xs text-slate-600">
            &copy; {year} <span className="text-slate-400 font-medium">Digital Life Lessons</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-600">
            <Link to="/cookies" className="hover:text-slate-400">Cookie Policy</Link>
            <Link to="/sitemap" className="hover:text-slate-400">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { Scale, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-black tracking-tighter uppercase">
                Nyaya<span className="text-blue-500">Assist</span>
              </span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              India's leading AI-powered platform connecting citizens with verified legal experts. Making justice accessible, affordable, and instant.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-widest text-blue-500">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'Services', 'Our Lawyers', 'How it Works', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors font-medium">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-widest text-blue-500">Legal Services</h3>
            <ul className="space-y-4">
              {['Property Law', 'Family & Matrimonial', 'Criminal Defense', 'Business Compliance', 'Civil Litigation'].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-gray-400 hover:text-white transition-colors font-medium">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-widest text-blue-500">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <span className="text-gray-400">123 Legal Plaza, Connaught Place, New Delhi, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-400">+91 1800-NYAYA-AI</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-400">support@nyayaassist.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} NyayaAssist. Built for a Digital India.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

const Step1 = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useOutletContext();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(draft => {
      const keys = name.split('.');
      let field = draft;
      for (let i = 0; i < keys.length - 1; i++) {
        field = field[keys[i]];
      }
      field[keys[keys.length - 1]] = value;
    });
  };

  const handleNext = async e => {
    e.preventDefault();
    const usernamePattern = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernamePattern.test(formData.username)) {
      toast.error(
        `Username is invalid:\n• Minimum 3 characters\n• Maximum 20 characters\n• Can only contain letters, digits, hyphens, underscores`
      );
      return;
    }

    try {
      const validation = await Meteor.callAsync('validateStep1', formData);
      toast.success('✅ Step 1 Complete');
      navigate('/signup/step2');
    } catch (error) {
      toast.error(error.reason || 'An unexpected error occurred!');
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center px-4">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontSize: '0.875rem',
            padding: '12px 16px',
            background: '#fff',
            color: '#333',
            border: '1px solid #e0e0e0',
            boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
            whiteSpace: 'pre-line',
          },
          duration: 4000,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex max-w-6xl w-full bg-[#D9D9D9] rounded-2xl shadow-lg overflow-hidden"
      >
        {/* LEFT: Logo and Title */}
        <div className="w-1/2 flex flex-col justify-center items-center px-10 py-16 space-y-6">
          <img
            src="/images/logo.png"
            alt="SkillTree Logo"
            className="w-52 h-52 object-contain drop-shadow-sm"
          />
          <h2 className="text-5xl font-bold text-[#025940] tracking-wide">
            SKILLTREE
          </h2>
        </div>

        {/* RIGHT: Step 1 Form */}
        <form
          onSubmit={handleNext}
          className="w-1/2 px-12 py-16 flex flex-col justify-center space-y-6 bg-[#D9D9D9]"
        >
          {/* Step indicator */}
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            <div className="w-1/4 h-1 bg-white"></div>
            <div className="w-4 h-4 bg-white border border-white rounded-full"></div>
            <div className="w-1/4 h-1 bg-white"></div>
            <div className="w-4 h-4 bg-white border border-white rounded-full"></div>
          </div>

          <h3 className="text-2xl font-bold text-black">Account Details</h3>

          <div>
            <label htmlFor="username" className="block text-sm font-semibold mb-1 text-black">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-full border border-gray-300 outline-none text-black bg-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1 text-black">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="jane@example.com"
              className="w-full px-4 py-3 rounded-full border border-gray-300 outline-none text-black bg-white"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#04BF8A] text-white rounded-full px-6 py-2 hover:bg-[#03a57e] transition-all font-medium"
            >
              →
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Step1;

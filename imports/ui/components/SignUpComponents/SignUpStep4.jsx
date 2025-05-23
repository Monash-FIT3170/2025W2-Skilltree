import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

const Step4 = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useOutletContext();

  const handleChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(draft => {
        draft.profile.avatarUrl = URL.createObjectURL(file);
        draft.profile.avatarFile = file;
      });
    }
  };

  const handleNext = async e => {
    e.preventDefault();
    try {
      await Meteor.callAsync('validateStep4', formData);
      toast.success('✅ Step 4 Complete');
      await Meteor.callAsync('createNewUser', formData);
      toast.success('🎉 Account created successfully!');
      navigate('/home');
    } catch (error) {
      toast.error(error.reason || 'Something went wrong!');
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white px-6 py-10">
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
            whiteSpace: 'pre-line'
          },
          duration: 4000
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex max-w-6xl w-full bg-[#D9D9D9] rounded-xl shadow-lg overflow-hidden p-12"
      >
        {/* LEFT SECTION: Logo + Text */}
        <div className="w-1/2 flex items-center pr-4">
          <div className="relative flex items-center">
            <img
              src="/images/logo.png"
              alt="SkillTree Logo"
              className="w-80 h-80 object-contain shrink-0"
            />
            <h2 className="text-5xl font-bold text-[#025940] absolute left-[74%]">
              SKILLTREE
            </h2>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <form
          onSubmit={handleNext}
          className="w-1/2 flex flex-col justify-center pl-6"
        >
          <div className="flex flex-col space-y-6 w-full max-w-[400px]">
            {/* Step Bar */}
            <div className="flex items-center justify-between w-full">
              <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
              <div className="h-1 bg-white flex-grow mx-2"></div>
              <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
              <div className="h-1 bg-white flex-grow mx-2"></div>
              <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
              <div className="h-1 bg-white flex-grow mx-2"></div>
              <div className="w-4 h-4 bg-[#04BF8A] rounded-full"></div>
            </div>

            <h3 className="text-2xl font-semibold text-black">
              Create Profile Picture
            </h3>

            {/* Profile Icon */}
            <label
              htmlFor="profileUpload"
              className="relative mx-auto cursor-pointer w-24 h-24 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 10a4 4 0 100-8 4 4 0 000 8zM2 16a6 6 0 1112 0H2z" />
              </svg>
              <div className="absolute bottom-0 right-0 bg-[#04BF8A] text-white rounded-full w-6 h-6 text-center text-sm leading-6">
                +
              </div>
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>

            {/* Optional Username Preview */}
            <p className="text-sm text-center text-black">
              @{formData.username || 'user123'}
            </p>

            {/* Navigation + Submit Buttons */}
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => navigate('/signup/step3')}
                className="w-10 h-10 rounded-full border-2 border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                ←
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#04BF8A] text-white text-sm font-semibold hover:bg-[#03a57e] transition-all"
              >
                Create
              </button>
            </div>

            <div>
              <p className="text-xs text-center text-gray-700">
                By creating an account, you agree to the{' '}
                <Link
                  to=""
                  className="text-gray-600 underline hover:text-[#026873]"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  to=""
                  className="text-gray-600 underline hover:text-[#026873]"
                >
                  Privacy Policy.
                </Link>
              </p>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Step4;

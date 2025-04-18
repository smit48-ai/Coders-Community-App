import React from "react";
import { motion } from "framer-motion";
import { MailIcon } from "@heroicons/react/outline";

const VerifyEmail = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-whites p-8 max-w-md text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-blue-100 p-4 rounded-full"
          >
            <MailIcon className="h-12 w-12 text-black" />
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">Check your inbox</h2>
        <p className="text-gray-500 mb-4">
          We've sent a verification link to your email. Please check your inbox
          and follow the link to verify your account.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
          Didn’t receive the email? Check your spam folder.
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;

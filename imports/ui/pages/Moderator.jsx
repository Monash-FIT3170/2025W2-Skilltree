// ../../ui/pages/Moderator.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

export const ModeratorForm = () => {
  const { skillTreeId } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    qualifications: '',
    proofOfPractice: '',
    reason: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Replace with your real submission (e.g., fetch/axios to backend)
    console.log('Form submitted for skillTreeId:', skillTreeId, formData);
  };

  return (
    <>
      <Helmet>
        <title>Moderator Application</title>
      </Helmet>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg mx-auto p-4 border rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold mb-4">Moderator Application</h2>

        {/* Skill Tree ID (read-only, from route) */}
        <div>
          <label htmlFor="skillTreeId" className="block font-medium">
            Skill Tree ID
          </label>
          <input
            id="skillTreeId"
            name="skillTreeId"
            value={skillTreeId ?? ''}
            readOnly
            className="w-full border rounded p-2 bg-gray-50"
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Qualifications (required) */}
        <div>
          <label htmlFor="qualifications" className="block font-medium">
            Qualifications *
          </label>
          <textarea
            id="qualifications"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Proof of Practice (required) */}
        <div>
          <label htmlFor="proofOfPractice" className="block font-medium">
            Proof of Practice *
          </label>
          <textarea
            id="proofOfPractice"
            name="proofOfPractice"
            value={formData.proofOfPractice}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Reason for being a moderator */}
        <div>
          <label htmlFor="reason" className="block font-medium">
            Why Do You Want to Be a Moderator?
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </>
  );
};

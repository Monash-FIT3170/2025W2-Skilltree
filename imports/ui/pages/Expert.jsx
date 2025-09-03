import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

export const ExpertForm = ({ skillTreeId }) => {
  const [formData, setFormData] = useState({
    name: '',
    areaOfExpertise: '',
    experience: '',
    publications: '',
    proofOfExpertise: '',
    reason: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Handle submission (e.g. send to server)
    console.log('Expert application submitted for skillTreeId:', skillTreeId, formData);
  };

  return (
    <>
      <Helmet>
        <title>Expert Application</title>
      </Helmet>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg mx-auto p-4 border rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold mb-4">Expert Application</h2>

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

        {/* Area of Expertise */}
        <div>
          <label htmlFor="areaOfExpertise" className="block font-medium">
            Area of Expertise *
          </label>
          <input
            id="areaOfExpertise"
            name="areaOfExpertise"
            value={formData.areaOfExpertise}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="experience" className="block font-medium">
            Years of Experience *
          </label>
          <input
            id="experience"
            name="experience"
            type="number"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Publications or Contributions */}
        <div>
          <label htmlFor="publications" className="block font-medium">
            Publications / Notable Contributions
          </label>
          <textarea
            id="publications"
            name="publications"
            value={formData.publications}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Proof of Expertise */}
        <div>
          <label htmlFor="proofOfExpertise" className="block font-medium">
            Proof of Expertise (Certifications, Portfolio, etc.) *
          </label>
          <textarea
            id="proofOfExpertise"
            name="proofOfExpertise"
            value={formData.proofOfExpertise}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="reason" className="block font-medium">
            Why Do You Want to Be an Expert on This Platform?
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </>
  );
};

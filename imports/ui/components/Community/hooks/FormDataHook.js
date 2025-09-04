import { useState, useEffect } from 'react';

export function useFormData(initialData = {}) {
  const [formData, setFormData] = useState(initialData);
  const [isModified, setIsModified] = useState(false);

  // When initialData changes (e.g., a new user is loaded), reset
  useEffect(() => {
    setFormData(initialData);
    setIsModified(false);
  }, [initialData]);

  const updateFormData = (path, value) => {
    setFormData(prev => {
      const updated = { ...prev };
      let current = updated;
      const keys = Array.isArray(path) ? path : path.split('.');

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        current[key] = Array.isArray(current[key])
          ? [...current[key]]
          : { ...current[key] };
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;
      return updated;
    });

    setIsModified(true);
  };

  return { formData, updateFormData, isModified };
}

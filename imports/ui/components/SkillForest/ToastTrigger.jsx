import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ToastTrigger = () => {
  const location = useLocation();

  if (location.state?.showToast) {
    toast.success('SkillForest created successfully!');
    location.state.showToast = false; // prevent future triggers
  }

  return null;
};

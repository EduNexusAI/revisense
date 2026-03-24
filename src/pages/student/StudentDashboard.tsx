import { useAuthStore } from '../../store/authStore';
import { calculateAge } from '../../utils/formatters';
import { Dashboard_Grade1to6 } from './Dashboard_Grade1to6';
import { Dashboard_Grade7to10 } from './Dashboard_Grade7to10';
import { Dashboard_PUCPlus } from './Dashboard_PUCPlus';

export const StudentDashboard = () => {
  const { user } = useAuthStore();

  if (!user || !user.dob) {
    return <Dashboard_Grade7to10 />;
  }

  const age = calculateAge(user.dob);

  if (age <= 11) {
    return <Dashboard_Grade1to6 />;
  } else if (age <= 16) {
    return <Dashboard_Grade7to10 />;
  } else {
    return <Dashboard_PUCPlus />;
  }
};

import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
  return useAppSelector((state) => state.auth);
};
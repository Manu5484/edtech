import {jwtDecode} from "jwt-decode";
import {useSelector} from 'react-redux';

export function useAuth() {
  const token = useSelector((state) => state.auth.token);
  if (!token) return { isLoggedIn: false };

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    return { isLoggedIn: !isExpired, user: decoded };
  } catch (e) {
    return { isLoggedIn: false };
  }
}
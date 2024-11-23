import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

function isTokenValid(token: string): boolean {
    try {
        const decoded: any = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        return decoded.exp > now;
    } catch (err) {
        return false;
    }
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem('token');

    if (!token || !isTokenValid(token)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;
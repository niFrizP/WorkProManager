import axios, { AxiosError } from 'axios';

// Interfaz para la respuesta de verificación exitosa
interface VerificacionTokenResponse {
    message: string;
}

// Interfaz para el manejo de errores
interface ErrorResponse {
    error: string;
    message?: string;
}

class TokenService {
    // Método para verificar el token
    public static async verificarToken(): Promise<VerificacionTokenResponse | ErrorResponse> {
        try {
            // Realiza la solicitud GET a la ruta de verificación de token en el backend
            const response = await axios.get<VerificacionTokenResponse>('/verify', { withCredentials: true });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                const message = error.response?.data.message;

                if (status === 401) {
                    switch (message) {
                        case 'No hay token':
                            console.log("No hay token presente en la solicitud.");
                            return { error: "No hay token" };
                        case 'Token expirado':
                            console.log("El token ha expirado.");
                            return { error: "Token expirado" };
                        case 'Token inválido':
                            console.log("El token es inválido.");
                            return { error: "Token inválido" };
                        default:
                            console.log("Error desconocido:", message);
                            return { error: "Error desconocido", message };
                    }
                } else {
                    console.error("Error de respuesta:", message);
                    return { error: "Error en la respuesta", message };
                }
            } else {
                console.error("Error de conexión con el servidor:", error);
                return { error: "Error de conexión con el servidor" };
            }
        }
    }
}

export default TokenService;

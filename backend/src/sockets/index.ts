import { Server } from 'socket.io';
import { handleWeatherSocket } from './weatherSocket';

let io: Server | null = null;

export const setupSocketIO = (server: any) => {
    if (!io) {
        io = new Server(server, {
            cors: {
                origin: process.env.WEATHEREASE_CLIENT_URL,
                methods: ['GET', 'POST'],
                credentials: true
            },
            transports: ['websocket', 'polling'],
        });

        io.on('connection', (socket) => {
            console.log('New client connected');

            handleWeatherSocket(socket);

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });

        console.log('Socket.IO server initialized');
    } else {
        console.log('Socket.IO server already running');
    }

    return io;
};

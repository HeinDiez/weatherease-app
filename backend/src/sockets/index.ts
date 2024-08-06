import { Server } from 'socket.io';
import { handleWeatherSocket } from './weatherSocket';

export const setupSocketIO = (server: any) => {
    const io = new Server(server, {
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

    return io;
};

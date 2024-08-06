import io from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SERVER_API_URL ?? ''
const socket = io(URL, {
    transports: ['websocket', 'polling'],
    withCredentials: false,
    secure: true
});

export { socket }
import { Server } from "socket.io";

let io
const configureSocket = (server) => {
    console.log(process.env.FRONTEND_BASE_URL);
    
     io = new Server(server, {
        
      cors: {
        origin: process.env.FRONTEND_BASE_URL,
        methods: ["GET", "POST"], 
        credentials: true,
      },
    });


    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);
    
        socket.on('disconnect', () => {
          console.log('User disconnected');
        });
      });
  return io
}
export {io}
export default configureSocket; 

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http'; 
import { connectToDatabase } from './utility/db';
import { Request, Response } from 'express';
import { initSocket } from './services/socket';

/** ROUTES IMPORT */
import userRoutes from './routes/userRoute';
import applicationRoutes from './routes/applicationRoute';
import auditLogRoutes from './routes/auditLogRoute';

dotenv.config();

const app = express();
const httpServer = createServer(app); 
/** MIDDLEWARES */
app.use(express.json());
app.use(cors({
    origin: ["https://tab-block.vercel.app","https://zingy-piroshki-d17470.netlify.app"]
   
}));
app.use(cookieParser());

/** ROUTES */
app.use('/api/auth', userRoutes);
app.use('/api/app', applicationRoutes);
app.use('/api/audit', auditLogRoutes);

app.get('/', (_: Request, res: Response): any => {
    return res.status(200).json("Welcome To TabLock!");
});

/** SOCKET.IO INTEGRATION */
initSocket(httpServer); // Initialize the Socket.IO logic

/** START SERVER */
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
    connectToDatabase();
    console.log(`Server is running at ${port}`);
});

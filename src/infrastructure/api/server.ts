import dotenv from 'dotenv';
import { app } from './express';

dotenv.config();
const port: number = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

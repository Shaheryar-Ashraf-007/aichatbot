import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };

  
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn,
  });
  return token;
};

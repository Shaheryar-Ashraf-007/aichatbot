import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const createToken = (id: string, email: string, expiresIn: string | number) => {
  const payload = { id, email };
  
  // Ensure SECRET_JWT is available
  const secret = process.env.SECRET_JWT;
  if (!secret) {
    throw new Error("SECRET_JWT is not defined in environment variables");
  }
  
  // Create options object with proper typing for expiresIn
  const options: SignOptions = {};
  
  // Only set expiresIn if it's a valid type
  if (typeof expiresIn === 'number' || 
      ['string', 'number'].includes(typeof expiresIn)) {
    // Cast as any to bypass the strict type checking
    options.expiresIn = expiresIn as any;
  }
  
  // Convert secret to Buffer to satisfy type requirements
  const token = jwt.sign(
    payload, 
    Buffer.from(secret, 'utf-8'),
    options
  );
  
  return token;
};
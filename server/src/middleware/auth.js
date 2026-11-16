import jwt from 'jsonwebtoken';
export function auth(req,res,next){try{const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');if(!token) return res.status(401).json({error:'Authentication required'});req.user=jwt.verify(token,process.env.JWT_SECRET);next();}catch{return res.status(401).json({error:'Invalid or expired session'});}}

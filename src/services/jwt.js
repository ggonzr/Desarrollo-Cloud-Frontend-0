import * as jwt from 'jsonwebtoken';

export function createToken(data) {
    const token = jwt.sign(data, process.env.REACT_APP_SECRET, { expiresIn: process.env.REACT_APP_TOKEN_EXPIRES_IN});
    return token;
}

export function decodeToken(token) {
    return jwt.verify(token, process.env.REACT_APP_SECRET, (err, decoded) => {        
        if (err) {
            console.log("[Decoded] Error");
            return {                
                success: false,
                data: "The token is not valid"
            };
        }
        else {
            console.log("[Decoded] Success");
            return {
                success: true,
                data: decoded
            }
        }
    });
}
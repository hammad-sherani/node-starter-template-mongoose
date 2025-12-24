import jwt from "jsonwebtoken";
import crypto from "crypto";
import ApiError from "../utils/ApiError.js";

class BaseController {
    
    generateOTP(length = 6) {
        if (length <= 0) return "";
        const digits = '0123456789';
        let otp = '';
        for (let i = 0; i < length; i++) {
            otp += digits[crypto.randomInt(0, 10)];
        }
        return otp;
    }

    decodeToken(req) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                throw new ApiError(401, "Unauthorised: Token missing");
            }

            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            
            return decoded;
        } catch (error) {
            throw new ApiError(401, "Invalid or expired token");
        }
    }
    
    filterResponse(obj, excludeFields = []) {
        const newObj = { ...obj };
        excludeFields.forEach(field => delete newObj[field]);
        return newObj;
    }
}

export default BaseController;
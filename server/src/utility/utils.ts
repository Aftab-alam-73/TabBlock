import bcrypt from 'bcryptjs';
import  Schema  from 'mongoose';
import  Jwt  from 'jsonwebtoken';

class Utils {

   private async generateSalt(): Promise<string> {
      const salt=bcrypt.genSalt(10);
      return salt;
    }
    public async getHashPassword(password: string): Promise<string> {
        const salt=await this.generateSalt();
        const hash=await bcrypt.hash(password,salt);
        return hash;
    }
    public async validatePassword(raw: string,hash:string): Promise<boolean> {
        const result=await bcrypt.compare(raw,hash) as boolean;
        return result;
    }
    public async getJwtToken(payload:{id:Schema.Types.ObjectId}): Promise<string>{
        const token:string=await Jwt.sign(payload,process.env.JWT_SECRET_KEY!,{expiresIn:"7d"});
        return token;
    }
} 

 export default new Utils();
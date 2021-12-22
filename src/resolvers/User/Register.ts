import { Request } from "express";
import { sendEmail } from "../../utils/sendEmail";
import { createConfirmationUrl } from "../../utils/createConfirmationUrl";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";

export default {
  register: async (
    _: void,
    {
      email,
      password,
      confirmPassword,
      firstName,
      lastName
    }: {
      email: string;
      password: string;
      confirmPassword: string;
      firstName: string;
      lastName:string;
    },
    { req }: { req: Request }
  ) => {
      const hashedPassword = await bcrypt.hash(password, 12);
      if(password != confirmPassword){
        return {
          user: null,
          error:{
            field:["password"],
            message:"password mismatch"
          },
        };
      }

      const checkUser: User | undefined = await User.findOne({ where: { email } });
      if(checkUser){
        return {
          user: null,
          error:{
            field:["email"],
            message:"Email exist"
          },
        };
      }

      const resp:any = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      }).save();


      if (resp.error) {

        return {
          user: null,
          error: {
            field:[""],
            message: resp.error.message
          },
        };
      } 

      const username = `${firstName} ${lastName}`

      await sendEmail(
        username,
        email,
        await createConfirmationUrl(resp.id)
      );

      return {
        user: resp.User,
        error: null,
      };
    
  },
};

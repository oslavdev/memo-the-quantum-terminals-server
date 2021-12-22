// import { sendEmail } from "../../utils/sendEmail";
// import { createConfirmationUrl } from "../../utils/createConfirmationUrl";
import bcrypt from "bcryptjs";
import { User } from "../entity/User";
import { sendEmailAdminIsCreated } from "./sendEmail";

export const createAdminAccount = async () =>{

    const admin: User | undefined = await User.findOne({where: [{ email: process.env.ADMIN_EMAIL }, {admin: true}] });
    if(admin){
        return;
    };

    console.log(process.env.ADMIN_PASSWORD)
    console.log("Creating administrator account...");
    const password = process.env.ADMIN_PASSWORD;

    if(!password){
        throw Error("Password variable is not found")
    };

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
        password: hashedPassword,
        username:process.env.ADMIN_USERNAME,
        country:process.env.ADMIN_COUNTRY,
        city:process.env.ADMIN_CITY,
        email:process.env.ADMIN_EMAIL,
        confirmed: true,
        admin: true
    };

    const response:any = await User.create(user).save();
    if(response.error){
        console.error("Could not create admin account!");
        throw response.error;
    };

    /** Sending confirm admin accoutn created email */
    sendEmailAdminIsCreated(response.username, response.email)

    console.log("Admin account was successfully created!");
    return;
};
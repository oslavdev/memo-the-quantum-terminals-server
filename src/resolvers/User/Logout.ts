import { COOKIE_NAME } from "../../constants/constants";

  export default {
    logout: async (
      _: void,
      body:any,
      { req, res }: { req: any, res:any }
    ) => {
        return new Promise((resolve) =>
        req.session.destroy((err:any) => {
          res.clearCookie(COOKIE_NAME);
          if (err) {
            console.log(err);
            resolve(false);
            return;
          }
  
          resolve(true);
        })
      );
    },
  };
  
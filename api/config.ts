export const config = {
    isProduction: process.env.NODE_ENV! === 'production',
    clientUrl: process.env.CLIENT_URL!,
    dbUrl: process.env.DATABASE_UR,
    jwtSecret: process.env.JWT_SECRET,

    accessJWTSecret: process.env.ACCESS_JWT_SECRET!,
    refreshJWTSecret: process.env.REFRESH_JWT_SECRET!,
  
    gitHubClientId: process.env.GITHUB_CLIENT_ID!,
    gitHubClientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }
  
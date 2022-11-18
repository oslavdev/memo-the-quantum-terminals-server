interface Request {
    query: string
  }
  
  interface RequestContext {
    request: Request
  }
  
  export const customLogger = {
    // Fires whenever a GraphQL request is received from a client.
    async requestDidStart(requestContext: RequestContext ) {
      console.log('Request started! Query:\n' + requestContext.request.query);
  
      return {
        // Fires whenever Apollo Server will parse a GraphQL
        // request to create its associated document AST.
        async parsingDidStart() {
          console.log('Parsing started!');
        },
  
        // Fires whenever Apollo Server will validate a
        // request's document AST against your GraphQL schema.
        async validationDidStart() {
          console.log("Validation started.")
          return async (errs:String[]) => {
            if (errs) {
              errs.forEach((err) => console.error(err));
            }
          };
        },
      };
    },
  
    async executionDidStart() {
      console.log("Schema execution started.")
      return {
        async executionDidEnd(err:String[]) {
          if (err) {
            console.error(err);
          }
        },
      };
    },
  };
  
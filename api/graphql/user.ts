import * as Constants from '../constants';
import * as JWT from 'jsonwebtoken'
import * as Utils from '../utils';
import { extendType, nonNull, objectType, stringArg, unionType } from 'nexus';
import * as TokenHelper from "../utils/token"
import bcrypt from 'bcrypt';


export const User = objectType({
  name: 'User',
  description: 'General User Response type.',
  definition(t) {
    t.nonNull.string('userId');
    t.nonNull.string('username');
    t.nonNull.string('email');
  },
});


export const Error = objectType({
  name: 'Error',
  description: 'General error',
  definition(t) {
    t.string('message');
    t.nonNull.int('status');
  },
});


export const FieldErrorBody = objectType({
  name: 'FieldErrorBody',
  description: 'Errors that return to submitted forms',
  definition(t) {
    t.string('field');
    t.string('message');
    t.nonNull.int('status');
  },
});

export const FieldError = objectType({
  name: 'FieldError',
  description: 'Errors that returns to submitted forms',
  definition(t) {
    t.nonNull.boolean('success');
    t.field('error', { type: 'FieldErrorBody' });
  },
});

/* #region Create User Mutation */


export const SuccessResponse = objectType({
  name: 'SuccessResponse',
  description: 'Successful user response',
  definition(t) {
    t.nonNull.boolean('success');
    t.string('token')
  },
});


export const CreateUserResponse = unionType({
  name: 'CreateUserResponse',
  description: 'Union type to return either User or error on create user mutation.',
  definition(t) {
    t.members('SuccessResponse', 'FieldError');
  },
  resolveType(data) {
    const __typename = data.success ? 'SuccessResponse' : 'FieldError';

    return __typename;
  },
});

/* #endregion */


export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: 'CreateUserResponse',
      description: 'This schema is for creating a new user',
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        confirmPassword: nonNull(stringArg()),
      },
      resolve: async (_root, args, ctx) =>{

        if (!args.password.match(Constants.PasswordPattern)) {
          return {
            __typename: 'FieldError',
            success: false,
            error: {
              field: 'password',
              message:
                'Password does not match schema. You need to have at least one capital letter, one special symbol and one number!',
              status: 200,
            },
          };
        }

        if (args.password != args.confirmPassword) {
          return {
            __typename: 'FieldError',
            success: false,
            error: {
              field: 'password',
              message: "Your password confirmation doesn't match password.",
              status: 200,
            },
          };
        }

        if (!Utils.validateEmail(args.email)) {
          return {
            __typename: 'FieldError',
            success: false,
            error: {
              field: 'email',
              message: 'Email does not match the pattern.',
              status: 200,
            },
          };
        }

        const existingUser = await ctx.db.users.findUnique({
          where: { email: args.email },
        });

        if (existingUser) {
          return {
            __typename: 'FieldError',
            success: false,
            error: {
              field: 'email',
              message: 'User with this email already exists.',
              status: 200,
            },
          };
        }

        const hashedPassword = await bcrypt.hash(args.password, 10);

        const userPayload = {
          username: args.username,
          password: hashedPassword,
          email: args.email,
          activated: true,
        };

        const createdUser = await ctx.db.users.create({ data: userPayload });

        if(createdUser){
          const accessToken = TokenHelper.generateAccessToken(createdUser.id)
          return { 
            success: true, 
            token: accessToken 
          };
        }

        return {
          success: false,
          error: {
            message:
              'Something went wrong! Please re-try again.',
          },
        }
       
      },
    });
  },
});

export const me = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      async resolve(_root, _args, ctx) {
        
        const user = await ctx.db.user.findUnique({
          where: {
            id: ctx.userId,
          },
        })
        
        if(!user){
          return null
        }

        return{
          username: user.username,
          email: user.email,
          userId: user.id
        }
      },
    });
  },
})

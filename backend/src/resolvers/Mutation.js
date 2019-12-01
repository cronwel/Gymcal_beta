const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, mailer } = require('../mail/mail01_passwordReset');



const Mutations = {

//----------------------------ITEM MUTATIONS----------------------------
  async createItem(db, args, ctx, info) {
    if( !ctx.request.userId ) {
      throw new Error(
        "Sorry, you need to be logged in to add items."
      )
    }
    const item = await ctx.db.mutation.createItem(
    {
      data: {
        user: {
          connect:  {
            id: ctx.request.userId,
          }
        },
        ...args
      }
    }, info);
    return item;
  },

  updateItem(db, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id
      },
    }, info );
  },

  async deleteItem( db, args, ctx, info) {
    const where = { 
      id: args.id
    };
    const item = await ctx.db.query.item( { where } , `{ id, title }` );
    return ctx.db.mutation.deleteItem( { where }, info );
  },

//----------------------------USER MUTATIONS---------------------------
  
  async signup( db, args, ctx, info ){
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash( args.password, 10 );
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: [ 'USER' ] },
      }
    }, info );
    const token = jwt.sign( { userId: user.id } , process.env.APP_SECRET );
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000*60*60*24*365,
    });
    return user;
  },

  async signin(db, { email, password }, ctx, info){
    const user = await ctx.db.query.user({ where: { email } });
    if ( !user ) {
      throw new Error( `It looks like we don't have an account for ${ email }`);
    }
    const valid = await bcrypt.compare( password, user.password );
    if ( !valid ) {
      throw new Error(`Hey, that's not the right password.`)
    }
    const token = jwt.sign( { userId: user.id }, process.env.APP_SECRET );
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000*60*60*24*265,
    });
    return user;
  },
  signout(db, args, ctx, info) {
    ctx.response.clearCookie( 'token' );
    return { message: 'See you later!'};
  },

//----------------------------USER MUTATIONS PASSWORD RESET---------------------------

  async resetRequest(db, args, ctx, info) {
    const user = await ctx.db.query.user({
      where: { email: args.email }
    })
    if( !user ) {
      throw new Error( `It looks like we don't have an account for ${ args.email }`);
    }
    const cryptoPromise = promisify(randomBytes);
    const resetToken = (await cryptoPromise(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    });
    const mailResponse = await transport.sendMail(
      {
        from: 'noelirias@gmail.com',
        to: user.email,
        subject: 'Password Reset',
        html: mailer(`Your Password Reset Instructions
        \n\n
        <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
        Click Here
        </a>`
        )
      })
    return { message: 'Thanks' };
  },
  async resetConfirm( db, args, ctx, info ) {
    if( args.password !== args.confirmPassword ){
      throw new Error( "Passwords don't match sausage fingers");
    }
    const [ user ] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000,
      }
    });
    if ( !user ) {
      throw new Error( 'Too late, you need to reset your password again because you took too long!' );
    }
    const password = await bcrypt.hash( args.password, 10 );
    const updatedUser = await ctx.db.mutation.updateUser( {
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    } );
    const token = jwt.sign( { userId: updatedUser.id }, process.env.APP_SECRET );
    ctx.response.cookie( 'token', token, {
      httpOnly: true,
      maxAge: 1000*60*60*24*365,
    });
    return updatedUser;
  },
};

module.exports = Mutations;

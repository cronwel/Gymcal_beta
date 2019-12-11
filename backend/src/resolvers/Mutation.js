const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, mailer } = require('../mail/mail01_passwordReset');
const { hasPermission } = require('../utilities/utilities');


const Mutations = {

//----------------------------ITEM MUTATIONS----------------------------
//----------------------------ITEM MUTATIONS----------------------------
//----------------------------ITEM MUTATIONS----------------------------
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
    const item = await ctx.db.query.item( { where } , `{ id, title user { id } }` );

    const ownsItem = item.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(
      permission => ['ADMIN', 'ITEMDELETE'].includes(permission)
    );
    if( !ownsItem && !hasPermissions ) {
      throw new Error("Buckaroo, you can't do that!!");
    }
    return ctx.db.mutation.deleteItem( { where }, info );
  },

//----------------------------USER MUTATIONS---------------------------
//----------------------------USER MUTATIONS---------------------------
//----------------------------USER MUTATIONS---------------------------
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
//----------------------------USER MUTATIONS PASSWORD RESET---------------------------
//----------------------------USER MUTATIONS PASSWORD RESET---------------------------
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
//----------------------------USER MUTATIONS PERMISSIONS---------------------------
//----------------------------USER MUTATIONS PERMISSIONS---------------------------
//----------------------------USER MUTATIONS PERMISSIONS---------------------------
//----------------------------USER MUTATIONS PERMISSIONS---------------------------

  async permissionsUpdate( parent, args, ctx, info ) {
    if (!ctx.request.userId ) {
      throw new Error('You need to be logged in......Buckaroo!');
    }
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId,
        },
      },
      info
    );
    hasPermission( currentUser, ['ADMIN', 'PERMISSIONUPDATE' ] );

    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions,
          },
        },
        where: {
          id: args.userId,
        },
      },
      info
    );
  },
//----------------------------CART MUTATIONS----------------------------------
//----------------------------CART MUTATIONS----------------------------------
//----------------------------CART MUTATIONS----------------------------------
//----------------------------CART MUTATIONS----------------------------------

  async addToCart(db, args, ctx, info ) {
    const { userId } = ctx.request;
    if( !userId ) {
      throw new Error("Sorry, you can't do that....Buckaroo!!!")
    }
    const [ existingCartItem ] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId },
        item: { id: args.id },
      },
    });
    if ( existingCartItem ) {
      return ctx.db.mutation.updateCartItem(
        {
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + 1 },
        },
        info
      );
    }
    return ctx.db.mutation.createCartItem(
      { 
        data: {
          user: {
            connect: { 
              id: userId
            },
          },
          item: {
            connect: {
              id: args.id 
            },
          },
        },
      },
      info
    );
  },
  async removeFromCart(db, args, ctx, info ) {
    const cartItem = await ctx.db.query.cartItem(
      {
        where: {
          id: args.id,
        },
      },
      `{ id, user { id } }`
    );
    if( !cartItem ) throw new Error('No item found!?!?');
    if( cartItem.user.id !== ctx.request.userId ) {
      throw new Error('Do not try that' );
    }
    return ctx.db.mutation.deleteCartItem(
      {
        where: { id: args.id },
      },
      info
    );
  },
};

module.exports = Mutations;

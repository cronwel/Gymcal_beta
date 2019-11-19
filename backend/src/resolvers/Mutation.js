const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Mutations = {

//----------------------------ITEM MUTATIONS----------------------------
  async createItem(db, args, ctx, info) {
  //  Authentication check
  const item = await ctx.db.mutation.createItem(
    {
      data: {
        ...args
      }
    }, info);
    return item;
  },

  updateItem(db, args, ctx, info) {
    // it's a copy
    const updates = { ...args };

    delete updates.id;//because id is returned, id cannot be updated
    // you are referring to the item with the ID
    // but it is not mutable
    // since it's a copy, it's okay to remove id
    return ctx.db.mutation.updateItem({
      // makes the necessary changes
      data: updates,
      //puts back the id in reference to the object
      where: {
        id: args.id
      },
    }, info );
  },

  async deleteItem( db, args, ctx, info) {
    const where = { 
      id: args.id
    };
    // find
    const item = await ctx.db.query.item( { where } , `{ id, title }` );
    //delete
    return ctx.db.mutation.deleteItem( { where }, info );
  },

//----------------------------USER MUTATIONS---------------------------
  
  async signup( db, args, ctx, info ){
    
    args.email = args.email.toLowerCase();// less issues

    const password = await bcrypt.hash( args.password, 10 ); // security layer 1

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
  }
};

module.exports = Mutations;

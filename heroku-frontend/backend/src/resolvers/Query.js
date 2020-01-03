const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utilities/utilities');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  signedinuser( parent, args, ctx, info ) {
    if( !ctx.request.userId ) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
    info );
  },
  
  async users( db, args, ctx, info ) {
    if ( !ctx.request.userId ) {
      throw new Error('You need to be logged in....Buckaroo!');
    }
    hasPermission( ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'] );
    return ctx.db.query.users( {}, info);
  },
  async order(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You are not logged in');
    }
    const order = await ctx.db.query.order(
      {
        where: {id: args.id },
      },
      info
    );
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');
    if (!ownsOrder && !hasPermissionToSeeOrder) {
      throw new Error("You can't lok at other orders");
    }
    return order;
  },
  async orders(parent, args, ctx, info ) {
    const { userId } = ctx.request;
    if(!userId) {
      throw new Error(" You need to be logged in");
    }
    return ctx.db.query.orders(
      { 
        where: { 
          user: { id: userId },
        },
      },
      info
    );
  }
};


module.exports = Query;
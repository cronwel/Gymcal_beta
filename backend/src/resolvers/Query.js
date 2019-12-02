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
    console.log( ctx.request.userId );
    
    hasPermission( ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'] );

    return ctx.db.query.users( {}, info);
  },
};


module.exports = Query;
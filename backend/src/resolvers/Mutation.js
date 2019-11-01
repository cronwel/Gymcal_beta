const Mutations = {
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

  async deleteItem(db, args, ctx, info) {
    const where = { 
      id: args.id
    };
    // find
    const item = await ctx.db.query.item( { where } , `{ id, title }` );

    //delete
    return ctx.db.mutation.deleteItem( { where }, info );
  }
};

module.exports = Mutations;

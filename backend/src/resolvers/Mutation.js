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
  }
};

module.exports = Mutations;

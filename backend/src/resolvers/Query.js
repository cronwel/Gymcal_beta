const Query = {
  dogs(parent, args, ctx, info) {
    globalThis.dogs = global.dogs || [];
    return global.dogs;
  },
};

module.exports = Query;

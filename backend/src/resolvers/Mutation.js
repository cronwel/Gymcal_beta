const Mutations = {};

module.exports = Mutations;
const Mutation = {
  createDog(db, args, ctx, info){
    globalThis.dogs = global.dogs || [];
    const newDog = { name: args.name };
    global.dogs.push(newDog);
    return newDog;
  }
};

module.exports = Mutation;

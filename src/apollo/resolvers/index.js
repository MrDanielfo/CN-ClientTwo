const resolvers = {
  Mutation: {
    setUserLogged: (parent, { logged }, { cache }) => {
      const userLogged = {
        userLogged: logged,
        __typename: 'loginState'
      };
      const data = { loginState: userLogged };
      cache.writeData({ data });
      return userLogged;
    }
  }
};

export default resolvers;

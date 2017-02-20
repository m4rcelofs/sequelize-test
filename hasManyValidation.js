const Sequelize = require('sequelize'),
      sequelize = new Sequelize('', '','', {
        host: 'localhost',
        dialect: 'sqlite',
      });

const throwError = () => {
  console.log('should print message below');
  throw new Error('this message should be printed');
};

const A = sequelize.define('A');
const B = sequelize.define('B', {
  name: {
    type: Sequelize.STRING,
    validate: { throwError }
  }
});

A.hasMany(B);
B.belongsTo(A);

const a = { Bs: [{name: ''}, {name: ''}]};
sequelize
  .sync()
  .then(() => A.create(a, { include: [{ association: A.associations.Bs }]}))
  .then(console.log)
  .catch(console.error);

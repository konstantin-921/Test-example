const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname} /../config/config.json`)[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const db = {
  Users: sequelize.import("./users"),
  Boards: sequelize.import("./boards"),
  Columns: sequelize.import("./columns"),
  Tasks: sequelize.import("./tasks"),
  Shares: sequelize.import("./share")
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

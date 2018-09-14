import models from "../models/index";

function oneUser(req, res, next) {
  // models.Users.findOne({
  //   attributes: ["login", "id"],
  //   raw: true
  // })
  //   .then(users => {
  res.send("users");
  // })
  // .catch(error => {
  //   next(error);
  // });
}

function allUsers(req, res, next) {
  models.Users.findAll({
    attributes: ["login", "id"],
    raw: true
  })
    .then(users => {
      res.json({ users });
    })
    .catch(error => {
      next(error);
    });
}

export { allUsers, oneUser };
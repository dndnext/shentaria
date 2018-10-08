require("dotenv-extended").load();

const MongoClient = require("mongodb").MongoClient;
const MongoObjectId = process.env.MONGO_URI
  ? require("mongodb").ObjectId
  : id => {
      return id;
    };

module.exports = () => {
  return new Promise((resolve, reject) => {
    if (process.env.MONGO_URI) {
      MongoClient.connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true },
        (err, mongoClient) => {
          if (err) return reject(err);
          const dbName = process.env.MONGO_URI.split("/")
            .pop()
            .split("?")
            .shift();
          const db = mongoClient.db(dbName);
          return resolve(db.collection("users"));
        },
      );
    }
  }).then(usersCollection => {
    return Promise.resolve({
      find: ({ id, email, emailToken, provider } = {}) => {
        let query = {};
        if (id) {
          query = { _id: MongoObjectId(id) };
        } else if (email) {
          query = { email: email };
        } else if (emailToken) {
          query = { emailToken: emailToken };
        } else if (provider) {
          query = { [`${provider.name}.id`]: provider.id };
        }

        return new Promise((resolve, reject) => {
          usersCollection.findOne(query, (err, user) => {
            if (err) return reject(err);
            return resolve(user);
          });
        });
      },
      insert: (user, oAuthProfile) => {
        return new Promise((resolve, reject) => {
          usersCollection.insert(user, (err, response) => {
            if (err) return reject(err);
            if (!user._id && response._id) user._id = response._id;
            return resolve(user);
          });
        });
      },
      update: (user, profile) => {
        return new Promise((resolve, reject) => {
          usersCollection.update(
            { _id: MongoObjectId(user._id) },
            user,
            {},
            err => {
              if (err) return reject(err);
              return resolve(user);
            },
          );
        });
      },
      remove: id => {
        return new Promise((resolve, reject) => {
          usersCollection.remove({ _id: MongoObjectId(id) }, err => {
            if (err) return reject(err);
            return resolve(true);
          });
        });
      },
      serialize: user => {
        if (user.id) {
          return Promise.resolve(user.id);
        } else if (user._id) {
          return Promise.resolve(user._id);
        } else {
          return Promise.reject(new Error("Unable to serialise user"));
        }
      },
      deserialize: id => {
        return new Promise((resolve, reject) => {
          usersCollection.findOne({ _id: MongoObjectId(id) }, (err, user) => {
            if (err) return reject(err);
            if (!user) return resolve(null);
            return resolve({
              id: user._id,
              name: user.name,
              email: user.email,
              emailVerified: user.emailVerified,
              admin: user.admin || false,
            });
          });
        });
      },
    });
  });
};

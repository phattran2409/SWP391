const { default: mongoose } = require("mongoose");
const { MongoClient } = require("mongodb");
require("dotenv").config();
mongoose


const dbState = [
  {
    value: 0,
    label: "Disconnected",
  },
  {
    value: 1,
    label: "Connected",
  },
  {
    value: 2,
    label: "Connecting",
  },
  {
    value: 3,
    label: "Disconnecting",
  },
];

const connection = async () => {
  const client = new MongoClient(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await mongoose.connect(process.env.DB_URI);
  const state = Number(mongoose.connection.readyState);
  console.log(dbState.find((f) => f.value === state).label, "to database");

  // list database
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases in the cluster:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));

  // confirm database name
  const db = client.db("myFirstDatabase");
  console.log(`Connected to database: ${db.databaseName}`);

  //

  // Optionally: Check a specific collection or document to verify further
  const collections = await db.listCollections().toArray();
  console.log("Collections in the database:");
  collections.forEach((collection) => console.log(` - ${collection.name}`));
}



module.exports = connection;


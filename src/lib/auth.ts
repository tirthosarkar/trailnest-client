import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
const uri = process.env.MONGO_DB_URI;

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGO_DB_URI"');
}

const client = new MongoClient(uri);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
});

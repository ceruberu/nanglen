import { MongoClient } from 'mongodb';

const MONGO_URL = 'mongodb://localhost:27017/nanglen';

export default async () => MongoClient.connect(MONGO_URL);

import { connect, ClientSession, Mongoose } from "mongoose";
import { config } from "./environment";

export class db {
  private static _instance: db;
  private _connection: Mongoose;

  private constructor() {}

  public static getInstance(): db {
    if (!db._instance) {
      db._instance = new db();
    }
    return db._instance;
  }

  public async connect(): Promise<void> {
    this._connection = await connect(config.MONGO_URI!);
  }

  public async startSession(): Promise<ClientSession> {
    return await this._connection.startSession();
  }
}

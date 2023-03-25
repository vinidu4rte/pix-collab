import { createConnection, ClientSession, Connection } from "mongoose";
import { config } from "./environment";

export class db {
  private static _instance: db;
  private _connection: Connection;

  private constructor() {}

  public static getInstance(): db {
    if (!db._instance) {
      db._instance = new db();
    }
    return db._instance;
  }

  public connect(): void {
    this._connection = createConnection(config.MONGO_URI!);
  }

  public async startSession(): Promise<ClientSession> {
    return await this._connection.startSession();
  }
}

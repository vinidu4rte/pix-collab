/* eslint-disable turbo/no-undeclared-env-vars */
import axios, { AxiosInstance } from "axios";

export interface WooviCreateChargeDto {
  correlationID: string;
  value: number;
  comment: string;
  expiresIn: 9999999999999;
}

export class Woovi {
  private client: AxiosInstance;

  constructor() {
    const baseURL = "https://api.openpix.com.br/api/v1";

    this.client = axios.create({ baseURL });

    this.client.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${process.env.WOOVI_API_KEY}`;
      return config;
    });
  }

  charge = {
    create: async (data: WooviCreateChargeDto) => {
      const response = await this.client.post("/charge", data);
      return response.data;
    },
  };
}

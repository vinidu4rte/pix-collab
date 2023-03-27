/* eslint-disable turbo/no-undeclared-env-vars */
import axios, { AxiosInstance } from "axios";

export interface WooviCreateChargeDto {
  correlationID: string;
  value: number;
  comment: string;
  expiresIn: 9999999999999;
}

export interface WooviCreateChargeReponse {
  charge: {
    customer: null;
    value: number;
    comment: string;
    identifier: string;
    correlationID: string;
    paymentLinkID: string;
    transactionID: string;
    status: string;
    giftbackAppliedValue: number;
    discount: number;
    valueWithDiscount: number;
    expiresDate: null;
    type: string;
    createdAt: string;
    additionalInfo: [];
    updatedAt: string;
    brCode: string;
    expiresIn: number;
    pixKey: string;
    paymentLinkUrl: string;
    qrCodeImage: string;
    globalID: string;
  };
  correlationID: string;
  brCode: string;
}

export class Woovi {
  private client: AxiosInstance;

  constructor() {
    const baseURL = "https://api.openpix.com.br";

    this.client = axios.create({ baseURL });

    this.client.interceptors.request.use((config) => {
      config.headers["Authorization"] = process.env.WOOVI_API_KEY;
      return config;
    });
  }

  charge = {
    create: async (
      data: WooviCreateChargeDto
    ): Promise<WooviCreateChargeReponse> => {
      const response = await this.client.post("/api/v1/charge", data);
      return response.data;
    },
    pay: async (transactionId: string) => {
      await this.client.get(`/openpix/testing?transactionID=${transactionId}`);
    },
  };
}

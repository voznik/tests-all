import { ApiResponse } from '@2p2c/shared/core';

export interface PaymentCardType {
  id: string;
  value: string;
}

export interface PaymentCard {
  cardExpiry: string;
  cardHolder: string;
  cardNumber: string;
  cardType: string;
  email: string;
}

export interface PaymentProduct {
  id: string;
  product: string;
  date: Date | number;
  amount: number;
}
export interface PaymentPayload {
  payment: PaymentProduct;
  card: PaymentCard;
}

export interface PaymentResponse extends ApiResponse {
  responseCode: string;
  responseMessage: string;
  invoiceNo: string;
  approvalCode: string;
}

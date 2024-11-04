export enum AcctType {
  SAVINGS = "SAVINGS",
  CHECKING = "CHECKING",
  EARLY_INCOME = "EARLY_INCOME",
}

export type Account = {
  id: string;
  type: AcctType;
  balanceCents: number;
};

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  ACH_TRANSFER = "ACH_TRANSFER",
  DEBIT = "DEBIT",
}

export type Transaction = {
  id: string;
  amountCents: number;
  type: TransactionType;
  transactedAt: string;
  summaryDetails: {
    category: "INVOICE_PAYMENT" | "CARD_PURCHASE" | "TRANSFER";
    counterparty: string;
  };
};

export type InvoiceSummary = {
  draftSummary: {
    count: number;
    processingDocumentsCount: number;
  };
  awaitingPaymentSummary: {
    count: number;
    preparingCount: number;
    totalReceivableAmountCents?: number;
  };
  paidSummary: {
    count: number;
    totalPaidAmountYTDCents: number;
    totalPaidAmountMonthCents: number;
  };
};

export type BackendResponse = {
  accounts: Account[];
  recentTransactions: Transaction[];
  invoiceSummary: InvoiceSummary;
};

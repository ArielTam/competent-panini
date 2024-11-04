import styled from "@emotion/styled";
import { formatDistance } from "date-fns";
import {
  HorizontalScrollable,
  HStack,
  LabelIconSpacer,
  VStack,
} from "../../../../components/buildingBlocks";
import { ArrowRightIcon } from "../../../../components/icons/ArrowRightIcon";
import { colors } from "../../../../constants";
import { getDollarString } from "../../../../helpers";
import { Transaction, TransactionType } from "../../../../sharedTypes";

const TransactionsHeader = styled("div")({
  display: "flex",
  color: `#010700`,
  gap: 16,
  margin: `0 24px`,
  fontWeight: 700,
});

const TransactionsLabel = styled("div")({
  borderBottom: `2px solid #E5E3DE`,
  paddingBottom: 8,
  flexGrow: 1,
});

const ViewAllButton = styled("button")({
  background: "none",
  border: "none",
  borderBottom: `2px solid #010700`,
  paddingBottom: 8,
  fontSize: 16,
});

const transactionIcon = {
  [TransactionType.ACH_TRANSFER]: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="none"
    >
      <path
        d="M1.75879e-05 6.46148C0.00146486 5.17665 0.512504 3.94486 1.42102 3.03634C2.32953 2.12783 3.56133 1.61679 4.84616 1.61534H11.3077V0.538423C11.3077 0.431922 11.3393 0.327813 11.3984 0.239262C11.4576 0.15071 11.5417 0.0816936 11.6401 0.0409393C11.7385 0.00018502 11.8468 -0.0104762 11.9512 0.0103038C12.0557 0.0310837 12.1516 0.0823718 12.2269 0.157682L13.8423 1.77306C13.9433 1.87404 14 2.011 14 2.1538C14 2.29661 13.9433 2.43356 13.8423 2.53454L12.2269 4.14993C12.1516 4.22523 12.0557 4.27652 11.9512 4.2973C11.8468 4.31808 11.7385 4.30742 11.6401 4.26667C11.5417 4.22591 11.4576 4.1569 11.3984 4.06835C11.3393 3.97979 11.3077 3.87568 11.3077 3.76918V2.69226H4.84616C3.84685 2.69339 2.88878 3.09086 2.18216 3.79749C1.47554 4.50411 1.07806 5.46217 1.07694 6.46148C1.07694 6.60429 1.02021 6.74125 0.919227 6.84223C0.818246 6.94321 0.681286 6.99995 0.538478 6.99995C0.395669 6.99995 0.25871 6.94321 0.157729 6.84223C0.056748 6.74125 1.75879e-05 6.60429 1.75879e-05 6.46148ZM13.4615 5.92302C13.3187 5.92303 13.1818 5.97976 13.0808 6.08074C12.9798 6.18172 12.9231 6.31868 12.9231 6.46148C12.9219 7.4608 12.5245 8.41886 11.8178 9.12548C11.1112 9.8321 10.1532 10.2296 9.15384 10.2307H2.69232V9.15379C2.69232 9.04729 2.66074 8.94318 2.60157 8.85462C2.5424 8.76607 2.4583 8.69706 2.35991 8.6563C2.26151 8.61555 2.15324 8.60489 2.04879 8.62567C1.94433 8.64645 1.84839 8.69773 1.77308 8.77304L0.157704 10.3884C0.0567274 10.4894 0 10.6264 0 10.7692C0 10.912 0.0567274 11.0489 0.157704 11.1499L1.77308 12.7653C1.84839 12.8406 1.94433 12.8919 2.04879 12.9127C2.15324 12.9334 2.26151 12.9228 2.35991 12.882C2.4583 12.8413 2.5424 12.7723 2.60157 12.6837C2.66074 12.5952 2.69232 12.491 2.69232 12.3845V11.3076H9.15384C10.4387 11.3062 11.6705 10.7951 12.579 9.88663C13.4875 8.97811 13.9985 7.74632 14 6.46148C14 6.31868 13.9432 6.18172 13.8423 6.08074C13.7413 5.97976 13.6043 5.92303 13.4615 5.92302Z"
        fill="#656360"
      />
    </svg>
  ),
  [TransactionType.DEBIT]: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
    >
      <path
        d="M13 3.05176e-05H1.00034C0.735224 0.000333721 0.481053 0.105785 0.293587 0.293251C0.106121 0.480717 0.000669464 0.734888 0.000366261 1V3.04597C0.000335637 3.04841 0 3.05079 0 3.05323C0 3.05568 0.000335637 3.05806 0.000366261 3.0605V8.9998C0.000669464 9.26491 0.106121 9.51908 0.293587 9.70655C0.481053 9.89401 0.735224 9.99947 1.00034 9.99977H13C13.2651 9.99947 13.5193 9.89401 13.7068 9.70655C13.8942 9.51908 13.9997 9.26491 14 8.9998V1C13.9997 0.734888 13.8942 0.480717 13.7068 0.293251C13.5193 0.105785 13.2651 0.000333721 13 3.05176e-05ZM7.4998 7.99982H6.49983C6.36723 7.99982 6.24005 7.94714 6.14629 7.85338C6.05252 7.75961 5.99984 7.63244 5.99984 7.49983C5.99984 7.36723 6.05252 7.24006 6.14629 7.14629C6.24005 7.05252 6.36723 6.99985 6.49983 6.99985H7.4998C7.63241 6.99985 7.75958 7.05252 7.85335 7.14629C7.94711 7.24006 7.99979 7.36723 7.99979 7.49983C7.99979 7.63244 7.94711 7.75961 7.85335 7.85338C7.75958 7.94714 7.63241 7.99982 7.4998 7.99982ZM11.4997 7.99982H9.49975C9.36715 7.99982 9.23997 7.94714 9.14621 7.85338C9.05244 7.75961 8.99976 7.63244 8.99976 7.49983C8.99976 7.36723 9.05244 7.24006 9.14621 7.14629C9.23997 7.05252 9.36715 6.99985 9.49975 6.99985H11.4997C11.6323 6.99985 11.7595 7.05252 11.8532 7.14629C11.947 7.24006 11.9997 7.36723 11.9997 7.49983C11.9997 7.63244 11.947 7.75961 11.8532 7.85338C11.7595 7.94714 11.6323 7.99982 11.4997 7.99982ZM1.00034 2.55325V1H13L13.0002 2.55325H1.00034Z"
        fill="#656360"
      />
    </svg>
  ),
  [TransactionType.DEPOSIT]: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M6.77848 7.38951L2.19643 7.39011C2.07558 7.39012 1.95743 7.3543 1.85694 7.28717C1.75645 7.22003 1.67812 7.12461 1.63187 7.01296C1.58561 6.90131 1.5735 6.77845 1.59707 6.65992C1.62063 6.54139 1.67882 6.4325 1.76427 6.34704L3.62359 4.48775L0.845575 1.70975C0.730989 1.59516 0.666619 1.43974 0.666626 1.27768C0.666633 1.11562 0.731016 0.960207 0.845612 0.845621C0.960208 0.731035 1.11563 0.666665 1.27769 0.666672C1.43974 0.666679 1.59516 0.731062 1.70975 0.845658L4.48768 3.62361L6.34692 1.76439C6.43238 1.67894 6.54125 1.62075 6.65978 1.59718C6.7783 1.5736 6.90116 1.5857 7.01281 1.63195C7.12446 1.67819 7.21989 1.7565 7.28703 1.85698C7.35417 1.95746 7.39002 2.07559 7.39003 2.19644V2.19651L7.38943 6.77857C7.38941 6.9406 7.32504 7.09598 7.21047 7.21055C7.0959 7.32512 6.94051 7.38949 6.77848 7.38951ZM15.3333 14.1113L15.3333 3.72399C15.3329 3.4 15.2041 3.08938 14.975 2.86028C14.7459 2.63119 14.4352 2.50232 14.1113 2.50195L10.4451 2.50195C10.2831 2.50195 10.1277 2.56632 10.0131 2.68091C9.89848 2.7955 9.83411 2.95092 9.83411 3.11297C9.83411 3.27502 9.89848 3.43044 10.0131 3.54502C10.1277 3.65961 10.2831 3.72399 10.4451 3.72399H14.1113V14.1113H3.7239V10.4452C3.7239 10.2832 3.65953 10.1277 3.54494 10.0132C3.43035 9.89857 3.27494 9.83419 3.11288 9.83419C2.95083 9.83419 2.79542 9.89857 2.68083 10.0132C2.56624 10.1277 2.50186 10.2832 2.50186 10.4452L2.50186 14.1113C2.50223 14.4353 2.6311 14.7459 2.8602 14.975C3.0893 15.2041 3.39991 15.333 3.7239 15.3334L14.1113 15.3334C14.4352 15.333 14.7459 15.2041 14.975 14.975C15.2041 14.7459 15.3329 14.4353 15.3333 14.1113Z"
        fill="#656360"
      />
    </svg>
  ),
};

const TransactionsContainer = styled(HStack)({
  border: `1px solid ${colors.object.tertiary}`,
  borderRadius: 4,
  margin: "16px 0 0 24px",
});

const TransactionPreview = styled(VStack)({
  padding: "24px 12px 16px 24px",
  gap: 8,
  borderRight: `1px solid ${colors.object.tertiary}`,
  minWidth: 140,

  ":last-of-type": {
    borderRight: "none",
  },
});

const TransactionAmount = styled(HStack)({
  fontWeight: 700,
  color: `#010700`,
  justifyContent: `left`,
});

const TransactionParty = styled("div")({
  maxWidth: 120,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  color: colors.type.primary,
});

const TransactionTypeHStack = styled(HStack)({
  gap: 4,
  justifyContent: "left",
  fontWeight: 400,
  color: colors.type.tertiary,
});

const transactionTypeTextMap = {
  [TransactionType.ACH_TRANSFER]: "Transfer",
  [TransactionType.DEBIT]: "Debit",
  [TransactionType.DEPOSIT]: "Deposit",
};

const getTimeFromNow = (dateIso: string) =>
  formatDistance(dateIso, new Date(), { addSuffix: true });

export interface TransactionsSectionProps {
  recentTransactions?: Transaction[];
}

export const TransactionsSection = ({
  recentTransactions,
}: TransactionsSectionProps) => {
  if (!recentTransactions?.length) return null;

  return (
    <>
      <TransactionsHeader>
        <TransactionsLabel>Transactions</TransactionsLabel>
        <ViewAllButton>View all</ViewAllButton>
      </TransactionsHeader>
      <HorizontalScrollable>
        <TransactionsContainer>
          {recentTransactions.map(
            ({ id, amountCents, type, transactedAt, summaryDetails }) => {
              const TransactionIcon = transactionIcon[type];
              const timeFromNow = getTimeFromNow(transactedAt);

              return (
                <TransactionPreview key={`transaction-preview-${id}`}>
                  <TransactionAmount>
                    <LabelIconSpacer>
                      {getDollarString(amountCents)}
                      <ArrowRightIcon color="#C6882C" />
                    </LabelIconSpacer>
                  </TransactionAmount>
                  <TransactionParty>
                    {summaryDetails.counterparty}
                  </TransactionParty>
                  <VStack style={{ gap: 4, color: colors.type.tertiary }}>
                    <TransactionTypeHStack>
                      <TransactionIcon />
                      {transactionTypeTextMap[type]}
                    </TransactionTypeHStack>
                    <div>{timeFromNow}</div>
                  </VStack>
                </TransactionPreview>
              );
            }
          )}
        </TransactionsContainer>
      </HorizontalScrollable>
    </>
  );
};

import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { Button, HStack, VStack } from "../../components/buildingBlocks";
import { colors } from "../../constants";
import { getDollarString } from "../../helpers";
import { BackendResponse } from "../../sharedTypes";
import { AccountsSection } from "./components/AccountsSection/AccountsSection";
import { EmptyState } from "./components/EmptyState/EmptyState";
import { InvoiceSection } from "./components/InvoiceSection/InvoiceSection";
import { TransactionsSection } from "./components/TransactionsSection/TransactionsSection";

const ChooseApiPageButton = styled(Button)(
  ({ isSelected }: { isSelected: boolean }) => ({
    ...(isSelected && {
      background: colors.brand.tertiary,
    }),
  })
);

export interface BalancePageProps {}

export const BalancePage = ({}: BalancePageProps) => {
  const apiPages = [1, 2, 3, 4, 5, 6, 7, 8];
  const [selectedPageIndex, setPageIndex] = useState(0);
  const [apiData, setApiData] = useState<BackendResponse>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://outgo-frontend-hw.vercel.app/api/overview?responseKey=${selectedPageIndex}`
      );
      const fetchedData: BackendResponse = await response.json();
      console.log(fetchedData);
      setApiData(fetchedData);
    };
    fetchData();
  }, [selectedPageIndex]);

  const totalBalanceCents =
    apiData?.accounts.reduce((sum, account) => sum + account.balanceCents, 0) ||
    0;

  const totalBalance = useMemo(
    () => getDollarString(totalBalanceCents),
    [totalBalanceCents]
  );

  return (
    <VStack>
      <HStack>
        {apiPages.map((_, pageIndex) => (
          <ChooseApiPageButton
            key={`page-${pageIndex}`}
            onClick={() => setPageIndex(pageIndex)}
            isSelected={pageIndex === selectedPageIndex}
          >
            {pageIndex}
          </ChooseApiPageButton>
        ))}
      </HStack>
      {apiData && totalBalanceCents ? (
        <AccountsSection
          accounts={apiData.accounts}
          totalBalance={totalBalance}
        />
      ) : (
        <EmptyState />
      )}
      <TransactionsSection recentTransactions={apiData?.recentTransactions} />
      <InvoiceSection invoiceSummary={apiData?.invoiceSummary} />
    </VStack>
  );
};

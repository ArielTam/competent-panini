import styled from "@emotion/styled";
import {
  Button,
  HStack,
  LabelIconSpacer,
  VStack,
} from "../../../../components/buildingBlocks";
import { CashIcon } from "../../../../components/icons/CashIcon";
import { ChevronIcon } from "../../../../components/icons/ChevronIcon";
import { DocumentIcon } from "../../../../components/icons/DocumentIcon";
import { DraftIcon } from "../../../../components/icons/DraftIcon";
import { PlusIcon } from "../../../../components/icons/PlusIcon";
import { getDollarString } from "../../../../helpers";
import { InvoiceSummary } from "../../../../sharedTypes";

const SectionHeader = styled(HStack)({
  borderBottom: `1px solid #E5E3DE`,
  paddingBottom: 32,
  margin: `32px 24px`,
  fontWeight: 700,
  color: `#010700`,
});

const SectionLabel = styled("div")({
  flexGrow: 1,
});

const NewInvoiceButton = styled(Button)({
  width: 103,
  height: 32,
});

const InvoiceCards = styled(VStack)({
  gap: 24,
  margin: `0 16px 21px 16px`,
});

const InvoiceCard = styled(VStack)({
  background: "white",
  borderRadius: 24,
  boxShadow: `0px 4px 2px 0px #0000000F`,
});

const InvoiceCardHeader = styled(HStack)({
  justifyContent: "space-between",
  fontSize: 20,
  lineHeight: `26px`,
  padding: 20,
  borderBottom: `1px solid #E5E3DE`,
  color: `#010700`,
});

const InvoiceCardHeaderSpacer = styled(LabelIconSpacer)({
  gap: 12,
});

const InvoiceCardBody = styled(VStack)({
  padding: 20,
  gap: 20,
});

const InvoiceLineItem = styled(HStack)({
  justifyContent: "space-between",
});

const InvoiceDollarAmount = styled("div")({
  color: `#010700`,
});

export const InvoiceSection = ({
  invoiceSummary,
}: {
  invoiceSummary?: InvoiceSummary;
}) => {
  if (!invoiceSummary) return null;

  return (
    <div>
      <SectionHeader>
        <SectionLabel>Invoices</SectionLabel>
        <NewInvoiceButton>
          <LabelIconSpacer>
            <PlusIcon />
            New
          </LabelIconSpacer>
        </NewInvoiceButton>
      </SectionHeader>
      <InvoiceCards>
        <InvoiceCard>
          <InvoiceCardHeader>
            <InvoiceCardHeaderSpacer>
              <DraftIcon />
              <div>{invoiceSummary.draftSummary.count}</div>
              <div>Draft</div>
            </InvoiceCardHeaderSpacer>
            <ChevronIcon />
          </InvoiceCardHeader>
          <InvoiceCardBody>
            <InvoiceLineItem>
              Processing {invoiceSummary.draftSummary.processingDocumentsCount}{" "}
              documents
            </InvoiceLineItem>
          </InvoiceCardBody>
        </InvoiceCard>
        <InvoiceCard>
          <InvoiceCardHeader>
            <InvoiceCardHeaderSpacer>
              <DocumentIcon />
              <div>{invoiceSummary.awaitingPaymentSummary.count}</div>
              <div>Awaiting payment</div>
            </InvoiceCardHeaderSpacer>
            <ChevronIcon />
          </InvoiceCardHeader>
          <InvoiceCardBody>
            <InvoiceLineItem>
              Preparing {invoiceSummary.awaitingPaymentSummary.preparingCount}{" "}
              invoices
            </InvoiceLineItem>
            <InvoiceLineItem>
              Total invoiced
              <InvoiceDollarAmount>
                {getDollarString(
                  invoiceSummary.awaitingPaymentSummary
                    ?.totalReceivableAmountCents || 0
                )}
              </InvoiceDollarAmount>
            </InvoiceLineItem>
          </InvoiceCardBody>
        </InvoiceCard>
        <InvoiceCard>
          <InvoiceCardHeader>
            <InvoiceCardHeaderSpacer>
              <CashIcon />
              <div>{invoiceSummary.paidSummary.count}</div>
              <div>Paid</div>
            </InvoiceCardHeaderSpacer>
            <ChevronIcon />
          </InvoiceCardHeader>
          <InvoiceCardBody>
            <InvoiceLineItem>
              This month
              <InvoiceDollarAmount>
                {getDollarString(
                  invoiceSummary.paidSummary.totalPaidAmountMonthCents
                )}
              </InvoiceDollarAmount>
            </InvoiceLineItem>
            <InvoiceLineItem>
              Year to date
              <InvoiceDollarAmount>
                {getDollarString(
                  invoiceSummary.paidSummary.totalPaidAmountYTDCents
                )}
              </InvoiceDollarAmount>
            </InvoiceLineItem>
          </InvoiceCardBody>
        </InvoiceCard>
      </InvoiceCards>
    </div>
  );
};

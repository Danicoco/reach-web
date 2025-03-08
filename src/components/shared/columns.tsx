import { formatCurrency } from "./utils";


export const transactionColumn = [
  {
    title: "Wallet",
    dataIndex: "name",
    render: (_: string, record: any) => (
      <p className="truncate break-words max-w-xs cursor-pointer">
        {record?.recipientWalletType == "reach" ? "Reach" : "Wallet"}
      </p>
    ),
  },
  {
    title: "Sender",
    dataIndex: "sender",
    render: (_: string, record: any) => (
      <p className="truncate break-words max-w-xs cursor-pointer">
        {record?.senderName}
      </p>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    render: (_: string, record: any) => (
      <p className="truncate break-words max-w-xs cursor-pointer">
        {formatCurrency(record?.amount || 0, record?.currency || "NGN")}
      </p>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (_: string, record: any) => (
      <p className="truncate break-words max-w-xs cursor-pointer">
        {record?.status}
      </p>
    ),
  },
];

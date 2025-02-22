import { formatCurrency } from "../shared/utils";
import { CheckCircle, Circle } from "react-feather";

type Props = {
  profileLoading: boolean;
  reachWallet: any;
  paymentType: string;
  setPaymentType: React.Dispatch<React.SetStateAction<string>>;
};

const MakePayment = ({
  profileLoading,
  reachWallet,
  setPaymentType,
  paymentType,
}: Props) => {
  return (
    <div>
      <p className="text-xl font-bold">Use Contract</p>

      <div className="flex justify-between">
        <div className="w-[70%]">
          <p className="text-lg">Creator Partnership</p>
          <p className="text-xs">
            Set up an agreement with our platform to boost your reach now and
            pay later
          </p>
        </div>

        <div onClick={() => setPaymentType("contract")}>
          {paymentType === "contract" ? <CheckCircle /> : <Circle />}
        </div>
      </div>

      <div className="p-1 border-[1px] bg-slate-500 my-3 rounded-xl"></div>

      <div>
        <p className="text-xl font-bold">Wallet</p>

        <div className="">
          <div className="flex justify-between">
            <p className="text-lg">Reach Balance</p>
            <div onClick={() => setPaymentType("wallet1")}>
              {paymentType === "wallet1" ? <CheckCircle /> : <Circle />}
            </div>
          </div>
          <div className="bg-[#6601FF] text-white px-3 py-6 rounded-xl my-2">
            <p className="text-xs">Amount</p>
            <p className="text-lg font-bold">
              {profileLoading
                ? "---"
                : formatCurrency(reachWallet?.wallet || 0, "USD")}
            </p>
          </div>
        </div>

        <div className="">
          <div className="flex justify-between">
            <p className="text-lg">Wallet Balance</p>
            <div onClick={() => setPaymentType("wallet2")}>
              {paymentType === "wallet2" ? <CheckCircle /> : <Circle />}
            </div>
          </div>
          <div className="bg-[#14C242] text-white px-3 py-6 rounded-xl my-2">
            <p className="text-xs">Amount</p>
            <p className="text-lg font-bold">
              {profileLoading
                ? "---"
                : formatCurrency(reachWallet?.wallet || 0, "USD")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;

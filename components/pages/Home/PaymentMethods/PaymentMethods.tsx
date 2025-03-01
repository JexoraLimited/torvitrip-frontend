import Image from "next/image";

import paymentimg from "@/assets/images/payment/footer-payment-method.png";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/utils/common";
import { FC, HTMLAttributes } from "react";

interface IPaymentMethods extends HTMLAttributes<HTMLDivElement> {}

const PaymentMethods: FC<IPaymentMethods> = (props) => {
  return (
    <section {...props} className={cn("py-12", props.className)}>
      <div className="main-container">
        <SectionHeading
          title="Payment Methods"
          description="TorviTrip allows multiple payment methods that allows you to pay without any hassle. Enjoy our services with hassle free payments."
          className="mb-6"
        />
        <div className="flex w-full gap-10 flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-xl mb-3 font-bold">Bangladeshi Taka (BDT)</h3>
            <Image src={paymentimg} alt="img" height={65} width={755} />
          </div>
          <div>
            <h3 className="text-xl mb-3 font-bold">
              United States Dollar (USD)
            </h3>
            <Image
              src={paymentimg}
              style={{ objectFit: "contain" }}
              alt="img"
              height={65}
              width={755}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;

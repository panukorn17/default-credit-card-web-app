interface DataInput {
    id: number;
    limit_bal: number;
    sex: number;
    education: number;
    marriage: number;
    age: number;
    pay_0: number;
    pay_2: number;
    pay_3: number;
    pay_4: number;
    pay_5: number;
    pay_6: number;
    bill_amt1: number;
    bill_amt2: number;
    bill_amt3: number;
    bill_amt4: number;
    bill_amt5: number;
    bill_amt6: number;
    pay_amt1: number;
    pay_amt2: number;
    pay_amt3: number;
    pay_amt4: number;
    pay_amt5: number;
    pay_amt6: number;
    default_payment_next_month: number;
    AVRG_PAY?: number;  // Optional since it may not exist initially
    AVRG_BILL?: number; // Optional since it may not exist initially
};

function calculateAverages(dataArray: DataInput[]) {
    console.log("Data array received by calculateAverages:", dataArray);
    const avgPayList: number[] = [];
    const avgBillList: number[] = [];
    const limitBalList: number[] = [];

    dataArray.forEach(data => {
        const avgPay = (
          data.pay_amt1 +
          data.pay_amt2 +
          data.pay_amt3 +
          data.pay_amt4 +
          data.pay_amt5 +
          data.pay_amt6
        ) / 6;
      
        const avgBill = (
          data.bill_amt1 +
          data.bill_amt2 +
          data.bill_amt3 +
          data.bill_amt4 +
          data.bill_amt5 +
          data.bill_amt6
        ) / 6;

        avgPayList.push(avgPay);
        avgBillList.push(avgBill);
        limitBalList.push(data.limit_bal);
    });

    return {
      AVRG_PAY: avgPayList,
      AVRG_BILL: avgBillList,
      limit_bal: limitBalList,
    };
}

export { calculateAverages, DataInput };
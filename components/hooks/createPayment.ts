interface PaymentDetails {
    order_id: string;
    order_amount: number;
    order_currency: string;
    order_note: string;
    order_meta: {
      return_url: string;
    };
    customer_details: {
      customer_id: string;
      customer_name: string;
      customer_email: string;
      customer_phone: string;
    };
  }
  
  async function createPayment(
    order_id: string,
    order_amount: number,
    customer_id: string,
    customer_name: string,
    customer_email: string,
    customer_phone: string
  ): Promise<any> {
    const res = await fetch("/api/get_page_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id,
        order_amount,
        order_currency: "INR",
        order_note: "Additional order info",
        order_meta: {
          return_url: `http://localhost:3000/order/${order_id}`,
        },
        customer_details: {
          customer_id,
          customer_name,
          customer_email,
          customer_phone,
        },
      }),
    });
    return await res.json();
  }
  
  export default createPayment;
  
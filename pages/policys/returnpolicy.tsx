import React from "react";

function returnpolicy() {
  return (
    <div style={{ margin: "20px" }}>
      <h2
        style={{ display: "flex", justifyContent: "center", fontWeight: 400 }}
      >
        Shipping & Returns Policy
      </h2>
      <p>
        Purchases are shipped from our warehouse by reputed courier agencies.
        Please allow following number of days from receipt of your order.
        <ul>
          <li>
            <b style={{ fontWeight: 400 }}>For India orders</b> - All domestic
            prepaid orders are processed within 2 business day, whereas COD
            orders take 3 business days to process as we verify the order
            personally to ensure a seamless process. Orders will be delivered
            within 3-7 business days upon confirmation. Delivery to locations
            which are in low coverage or difficult to reach areas may take
            between 10-12 working days.
          </li>
          <li>
            <b style={{ fontWeight: 400 }}>For International orders </b> - All
            international orders are processed within 3 business day.You can
            expect delivery of the order within 10-15 business day.
          </li>
        </ul>
      </p>
      <h3 style={{ fontWeight: 400 }}>ORDER DELIVERIES WILL BE MADE BETWEEN</h3>
      <ul>
        <li>
          10:00 AM - 6:00 PM Monday - Saturday. Excluding public holidays.
        </li>
        <li>
          Goods will need to be signed for upon delivery. If you cannot be there
          to sign for your delivery please suggest an alternative i.e. a family
          member, colleague, neighbour, etc. However kalyaniammas takes no
          responsibility for goods signed by an alternative person.
        </li>
        <li>kalyaniammas is not responsible for damage after delivery.</li>
        <li>
          For any complaints with regards to your order please contact Customer
          Care within 7 business days of your order delivery for resolution.
        </li>
        <li>
          Shipping and handling rates may vary based on product, packaging,
          size, volume, type and other considerations. The shipping and handling
          charges are given at the time of check out and consumers will know
          about this before making payments
        </li>
      </ul>
      <h3 style={{ fontWeight: 400 }}>SHIPPING CHARGES</h3>
      <h3 style={{ fontWeight: 400 }}>For India Orders:</h3>
      <p>
        <ul>
          <p>
            We ship products throughout India. The shipping rates vary according
            to the total cart value as follows:For prepaid orders:
          </p>
          <li>1. Below Rs. 500 - Rs. 50 is charged</li>
          <li>2. From Rs. 501 to Rs.998 - Rs. 70 is charged</li>
          <li>3. Above Rs. 999, we have free shipping</li>
        </ul>
      </p>
      <p>For COD orders:</p>
      <p>Below Rs. 10,000 - Rs. 86 is charged for shipping.</p>
      <p>We do not accept COD orders above Rs. 10,000.</p>
      <h3 style={{ fontWeight: 400 }}>For International Orders:</h3>
      <ul>
        <li>We also ship internationally across all countries</li>
        <li>
          Shipping and handling rates vary based on the shipping destination.
          You will see the final shipping and handling charges at the time of
          checkout after you provide the shipping address for your order.
        </li>
        <li>
          All international orders may attract local duties in that country and
          the customer will have to pay locally, accordingly.
        </li>
      </ul>
      <h3 style={{ fontWeight: 400 }}>RETURNS & REFUNDS POLICY</h3>
      <p>
        <ul>
          <li>
            At kalyaniammas, we strive to give you the very best shopping
            experience possible. However, considering that opened or damaged
            products cannot be reused, we cannot accept exchange or return of
            opened or used products once sold or delivered.
          </li>
          <li>
            kalyaniammas is not responsible for any damage caused after
            delivery.In case the product is received in a damaged{" "}
            {"(broken, leakage or any other) "}condition, refund or replacement
            will take place only if informed within 24 hours with video proof of
            unboxing, from the time of delivery.
          </li>
        </ul>
      </p>
      <p>
        <a style={{ color: "blue" }} href="mailto:kalyaniammawayand@gmail.com" >kalyaniammawayanad@gmail.com</a>
        {"(For shipment related queries)"}
      </p>
      <ul>
        <li>
          Returns and exchanges requests will be subject to checking and vetting
          by kalyaniammas.
        </li>
        <li>
          Damages due to neglect, improper usage or wrong application will not
          be covered under this Policy.
        </li>
        <li>
          Once your return request has been accepted,the refund will be
          processed within 7 business days and the amount will be transferred
          via the same payment mode used while placing the order.
        </li>
        <li>
          A refund can be obtained if the order is cancelled by you either
          before the order ships or within 24 hours of order placement,
          whichever is earlier. If accepted, it will be processed within 7 days.
          No refund shall be made after the order is shipped.
        </li>
        <li>No Refund shall be made once goods are sold.</li>
      </ul>
    </div>
  );
}

export default returnpolicy;

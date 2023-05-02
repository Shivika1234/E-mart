const crypto = require("crypto");
const Razorpay = require("razorpay");
const connection = require("../model/db");

const instance = new Razorpay({
  key_id: process.env.ROZER_API_KEY,
  key_secret: process.env.ROZER_API_SECRET,
});

const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.send({ status: 400, Error: error.message });
  }
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log(req.body)

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.ROZER_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    ///Database comes here

    const sqlQuery = "insert into payment set ?";
    connection.query(sqlQuery,[razorpay_order_id, razorpay_payment_id, razorpay_signature], (err, result) => {
      if (err) {
        return res.send({ status: 400, Error: err.message });
      }
      res.send({ status: 200, "response": result });
    });
    // await Payment.create({
    //     razorpay_order_id,
    //     razorpay_payment_id,
    //     razorpay_signature,
    // })

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(200).json({
      success: false,
    });
  }
};

module.exports = { checkout, paymentVerification };

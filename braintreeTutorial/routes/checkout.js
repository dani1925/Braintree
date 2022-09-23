const express = require('express');
const router = express.Router();
const braintree = require('braintree');
// The checkout route


router.post('/', (req, res, next) => {
  
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'gc7p8sdryxzcdnqw',
    publicKey: 'tbyhwx673prdfg47',
    privateKey: '398825c513589dd962210532b7e58b15'
  });

  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  const newTransaction = gateway.transaction.sale({
    amount: req.body.amount,
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, (error, result) => {
      if (result) {
        res.send(result);
        return 400;
      } else {
        res.status(500).send(error);
        return 500;
      }
  });
});

module.exports = router;
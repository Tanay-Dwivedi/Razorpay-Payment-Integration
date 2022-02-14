const express = require('express');
const Razorpay = require('razorpay');

let app = express();

const rajorpay = new Razorpay({
  key_id: "rzp_test_7hVAw10ea11FVb",
  key_secret: "nfKgSU13ajnXEj49oxdj4rEH",
});

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:false}));

app.get('/', (req, res) => {

    res.render('rajorpay.ejs');

});

app.post('/order', (req,res) => {

    let options = {
      amount: 50000,
      currency: "INR",
    };
    rajorpay.orders.create(options, function(err, order){
        console.log(order);
        res.json(order);
    });
});

app.post('/is-order-complete', (req,res) => {

    rajorpay.payments
      .fetch(req.body.razorpay_payment_id)
      .then((paymentDocument) => {
        if(paymentDocument == 'captured') {
            res.send('Payment successful')
        }
        else {
            res.redirect('/');
        }
      });

});

app.listen(5000);
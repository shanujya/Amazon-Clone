/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51NE8FrSJufYFsZRGCTWcagNINYQGqNxZPEld94vYCSnJSEZS8AVPg5wHVBuJ62zL09ukzvS4XqC89qLbEMg546rY00W8VIe4vg");

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: "usd",
    });

    // OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// - Listen command
exports.api = functions.https.onRequest(app);
//("sk_test_51NE8FrSJufYFsZRGCTWcagNINYQGqNxZPEld94vYCSnJSEZS8AVPg5wHVBuJ62zL09ukzvS4XqC89qLbEMg546rY00W8VIe4vg");



// (http://127.0.0.1:5001/clone-c3f06/us-central1/api).


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

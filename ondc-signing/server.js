// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import {
  createKeyPair,
  createAuthorizationHeader,
  verifyMessage,
  createSigningString,
} from "./utils/cryptoUtils.js";

dotenv.config();

const stagingDetails = {
  subscriber_id: "opencart-test-adaptor.ondc.org",
  ukId: "1bad2579-d2c1-4169-8580-6ce7b3c96732",
  signing_public_key: "cxEdUA4sM4rJWdzc0YKV/H7dscVvj/47aX6kajOEf20=",
  encr_public_key: "MCowBQYDK2VuAyEAjwQ/anmu2DPEff2H5v5BBMOorOngTLLAj2jU9SnHFxU=",
};

const app = express();
app.use(cors()); 
app.use(express.json());

const privateKey = process.env.PRIVATE_KEY;
const publicKey = stagingDetails.signing_public_key;

app.get("/", (req, res) => {
  res.send("ONDC Signing Server is running!");
});

app.get("/generate-keys", async (req, res) => {
  const keys = await createKeyPair();
  res.json(keys);
});

app.post("/sign", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  if (!privateKey)
    return res.status(500).json({ error: "Private key not configured" });

  console.log("Message to be Signed:", message);
  const header = await createAuthorizationHeader(message, privateKey);
  res.json({ authorization: header });
});

app.post("/verify", async (req, res) => {
  const { signedString, message } = req.body;
  if (!signedString || !message)
    return res.status(400).json({ error: "Invalid request" });

  console.log("Signed String for Verification:", signedString);
  console.log("Message for Verification:", message);

  const { signingString } = await createSigningString(message);
  const isValid = await verifyMessage(signedString, signingString, publicKey);

  res.json({ valid: isValid });
});

//The /lookup endpoint to call the ONDC registry
app.post("/lookup", async (req, res) => {
  const { subscriber_id, domain, ukId, country, city, type } = req.body;

  console.log('first');
  console.log('subscriber_id',subscriber_id);
  console.log('domain',domain);
  console.log('ukId',ukId);
  console.log('country',country);
  console.log('city',city);
  console.log('type',type);

  // Ensuring all required fields are provided
  if (!subscriber_id || !domain || !ukId || !country || !city || !type) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Calling ONDC registry using Axios
    const response = await axios.post("https://staging.registry.ondc.org/lookup", {
      subscriber_id,
      domain,
      ukId,
      country,
      city,
      type,
    });

    // Forwarding the response from the ONDC registry to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error calling ONDC registry:", error.message);
    res.status(500).json({ error: "Error calling ONDC registry" });
  }
});

// The /vlookup endpoint to call the ONDC registry
app.post("/vlookup", async (req, res) => {
  const {
    sender_subscriber_id,
    request_id,
    timestamp,
    signature,
    search_parameters,
    country,
    domain,
  } = req.body;

  // Validate required fields
  if (!sender_subscriber_id || !request_id || !timestamp || !signature || !search_parameters || !country || !domain) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Prepare data for the ONDC registry lookup request
    const payload = {
      sender_subscriber_id,
      request_id,
      timestamp,
      signature,
      search_parameters,
      country,
      domain,
    };

    // Call the ONDC registry vlookup endpoint using Axios
    const response = await axios.post("https://staging.registry.ondc.org/vlookup", payload);

    // Forward the response from the ONDC registry to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error calling ONDC registry:", error.message);
    res.status(500).json({ error: "Error calling ONDC registry" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const accounts = [
  {
    type: 'current',
    pinNumber: '1234',
    balance: '134.12',
  },
  {
    type: 'saving',
    pinNumber: '1234',
    balance: '154.12',
  },
];

// Helper function to get account details
const getAccount = (type, pinNumber) => {
  return accounts.find(account => 
    account.type.toLowerCase() === type.toLowerCase() &&
    account.pinNumber === pinNumber
  );
};

// Build Lex response helper functions
const elicitSlot = (sessionAttributes, intentName, slots, slotToElicit, message) => ({
  sessionState: {
    sessionAttributes,
    intent: {
      name: intentName,
      slots,
      state: "InProgress",
      confirmationState: "None",
    },
    dialogAction: {
      type: "ElicitSlot",
      slotToElicit,
    },
  },
  messages: [message],
});

const close = (sessionAttributes, intentName, slots, fulfillmentState, message) => ({
  sessionState: {
    sessionAttributes,
    intent: {
      name: intentName,
      slots,
      state: "Fulfilled",
      confirmationState: "None",
    },
    dialogAction: {
      type: "Close",
      fulfillmentState,
    },
  },
  messages: [message],
});

// Main function to handle intent
const handleBalanceCheckIntent = (event) => {
  const sessionAttributes = event.sessionState.sessionAttributes || {};
  const slots = event.sessionState.intent.slots;

  // Extract slot values
  const pinNumber = slots.PinNumber.value.interpretedValue;
  const accountType = slots.AccountType.value.interpretedValue;

  // Check if account exists
  const account = getAccount(accountType, pinNumber);

  if (!account) {
    // If account not found, ask user to re-enter pin
    return elicitSlot(
      sessionAttributes,
      event.sessionState.intent.name,
      slots,
      "PinNumber",
      {
        contentType: "PlainText",
        content: "No accounts have been found with this PIN. Please re-enter your PIN.",
      }
    );
  }

  // Account found, respond with balance
  return close(sessionAttributes, event.sessionState.intent.name , slots, "Fulfilled", {
    contentType: "PlainText",
    content: `You have £${account.balance} in your ${accountType} account.`,
  });
};

// Lambda handler
// Input: Lex event containing intent that have AccountType and PinNumber
// Output: response containing account balance
export const handler = async (event, context, callback) => {
  console.log("Event received:", JSON.stringify(event, null, 2));

  if (event.sessionState.intent.name === "GetBalanceCheck") {
    const response = handleBalanceCheckIntent(event);
    console.log("Response sent:", JSON.stringify(response, null, 2));
    return response;
  }

  // Default response for unsupported intents
  return close({}, "Failed", {
    contentType: "PlainText",
    content: "Sorry, I couldn't handle your request.",
  });
};

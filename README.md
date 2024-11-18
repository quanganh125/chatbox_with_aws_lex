**Last Updated:** April 2019

# Building Chatbots with Amazon Lex

## Overview

Amazon Lex is a service that enables developers to build conversational interfaces using voice and text. It provides advanced deep learning features like automatic speech recognition (ASR) for speech-to-text conversion and natural language understanding (NLU) to identify user intent. With the same technologies powering Amazon Alexa, developers can easily create sophisticated, natural language chatbots. This lab demonstrates creating a new bot, including defining intents and slots.

- Creating a Lex bot
- Adding intents
- Adding slot types
- Using AWS Lambda as the back-end logic for Lex

# Step 1: Create the bot


1. Log in to the [AWS console](https://console.aws.amazon.com/lex/home) and navigate to the Amazon Lex service
- **Please ensure you have selected North Virginia as the region in the top right (Amazon Connect is not available in all regions yet)**
- If you have never created a bot, click &quot;Get Started&quot;
- Choose &quot;Create bot&quot;, which will display a dialog asking you to defined your bot
2. We want to build a bot from scratch so we'll choose &quot;Traditional&quot; along with &quot;create a blank bot&quot;
- Our bot name will be &quot;PersonalBanker&quot;
- With IAM permissions: "Create a role with basic Amazon Lex permissions."
- Choose &quot;No&quot; to the Children&#39;s Online Privacy Protection Act (COPPA)
- Click &quot;Next&quot;

![Create your Lex bot](images/picture_01.png)

3. Next, we are going to settings language for our bot
- Select your preferred language
- Choose your preferred output voice (You can test voice sample by clicking &quot;Play&quot; button)
- Click &quot;Done&quot;to create a draft version

![Create your Lex bot](images/picture_02.png)

4. We will start by creating an **intent**, which represents an action that the user wants to perform. For example, Our first intent enables the user to get account details, so name this intent &quot;GetBalanceCheck&quot; 
5. We now want to provide samples of what our user would type or say to perform this action (i.e. to activate this intent). Under &quot;Sample utterances&quot;, type the below phrases and hit [enter] or click &quot;Add utterance&quot; button after each phrase. Make sure you do not add a question mark at the end of the phrase as this will cause build issues later on.
- _Check my bank balance_
- _How much money is in my account_
- _How much money do i have_
- _I want to check my balance_

![Sample utterance](images/picture_03.png)

6. Next we define a **slot** which is information we need to process the users request. This information can be included in the utterance (query) that the user types or says, and if not included, Lex will prompt the user for the information. In this case where we build a banker chatbot, the slots would be account type and pin number.

- Under Slots section click &quot;Add slot&quot; button
- For &#39;name&#39; enter &quot;AccountType&quot; 
- Specify &quot;What type of account do you want to check (Current or Savings)?&quot; for the &quot;Prompt&quot; field. This prompt will be used by our bot if the user does not specify an account type when asking a question.
- You can leave  &quot;Slot type&quot; blank for a moment and then click &quot;Add&quot;

7. Click &quot;Save Intent&quot; for temporarily change

8. Under new slot that you just has been created, choose &quot;Advance options&quot;

9. While Lex includes many built-in slot types (such as number, colour, city, food, etc), in this case we want to define a custom slot to get the account type that the user is referring to.

- Select the &quot;Create slot type&quot;, 
- For &quot;Slot type name&quot; enter &quot;AccountType&quot; 
- Click &quot;Add&quot;
![Sample utterance](images/picture_04.png)


10. For Value, we want to allow the user to make queries against either their &quot;Saving&quot; or &quot;Current&quot; account. So:
- For Slot value resolution, select &quot;restrict to slot values&quot;
- Enter &quot;savings&quot; and &quot;current&quot; as values and click &quot;Add value&quot;
- Click &quot;Save Slot type&quot;

![Sample utterance](images/picture_06.png)

<!-- TODO -->
11. We now have to link the slot types to the Intent so go back to GetBalanceCheck intent. In the existing Slot list change the &quot;Slot type&quot; to &quot;AccountType&quot; so that it matches the slot name that we specified when we created the sample utterences.

12. We are now going to ask a security follow up question and ask the user to enter their four digit pin number.
- Add another slot and add the name as &quot;PinNumber&quot;.
- Select the slot type AMAZON.NUMBER and add the prompt as &quot;What is your pin number for your {AccountType} account&quot;. 
- Ensure you click on the Add button to add your new slot.

![Sample utterance](images/picture_07.png)

It is worth noting as you build other intents you can modify the order of the Slot collection (ie what questions get asked in which order) and also whether or not the slot is "Required" before passing the values to our external function.

13.  Scroll down and click &quot;Save Intent&quot;


14. Let&#39;s build this simple Bot: Hit the grey Build button at the top right corner. 

The build process takes approximately a minute. Once complete, you can ask your bot a question as a way to test it. For example, you could type &quot;what is my balance
?&quot; in the chat window, or click the microphone symbol, speak your request and client it again to have Lex translate your speech to text. At this stage since we have not added in the backend Lambda function, the response will be that the bot is ready for fulfillment and will show you the values which will be transferred.

![TestBot](images/picture_08.png).

14. It is possible to give the user a simpler interface on the bot to multiple choice questions using Response Cards. 
- Choose &quot;Advanced options&quot; of AccountType slot. 
- Click button &quot;More prompt options&quot; under Slot prompt section. 
- Under slot prompts click &quot;Add&quot; button form top right and select Add card group
- Provide button info like below and click &quot;Update prompts&quot;

![TestBot](images/picture_09.png).

15. Rebuild the bot and test result should be like this

![TestBot](images/picture_10.png).

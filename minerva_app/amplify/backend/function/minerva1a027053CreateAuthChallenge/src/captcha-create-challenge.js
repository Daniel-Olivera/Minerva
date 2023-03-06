/**
 * @type {import('@types/aws-lambda').CreateAuthChallengeTriggerHandler}
 */
const axios = require("axios");

const config = {
  recaptcha: {
    secretKey: process.env.SECRET_KEY,
  },
};

exports.handler = async (event) => {
  // This is stuff that amplify made on its own

  if (event.request.session.length === 2 && event.request.challengeName === 'CUSTOM_CHALLENGE') {
    event.response.publicChallengeParameters = { trigger: 'true' };
    event.response.privateChallengeParameters = { answer: '' };
    event.response.challengeMetadata = 'CAPTCHA_CHALLENGE';  
  }

  // // This is new
  //   console.log(event);
  // if (!event.request.validationData) {
  //   throw new Error("Missing validation data");
  // }
  // try {
  //   const payload = {
  //     secret: config.recaptcha.secretKey,
  //     response: event.request.validationData.captcha,
  //     remoteip: undefined,
  //   };
  //   const verifyResponse = await axios({
  //     method: "post",
  //     url: "https://www.google.com/recaptcha/api/siteverify",
  //     params: payload,
  //   });
  //   if (verifyResponse.data.success) {
  //     return event;
  //   }
  //   else {
  //     throw new Error("Recaptcha verification failed");
  //   }
  // }
  // catch (error) {
  //   console.error(error);
  //   throw error;
  // }
};

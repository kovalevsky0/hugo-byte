(async () => {

  const subscriptionClassName = 'subscription';
  const subscriptionSuccessMsgClassName = `${subscriptionClassName}__success-msg`;
  const subscriptionFailureMsgClassName = `${subscriptionClassName}__failure-msg`;
  const subscriptionSuccessMsgVisibleClassName = `${subscriptionSuccessMsgClassName}_visible`;
  const subscriptionFailureMsgVisibleClassName = `${subscriptionFailureMsgClassName}_visible`;

  const subscriptionBlock = document.querySelector('#subscription');

  if (!subscriptionBlock) {
      return;
  }

  const subscriptionForm = subscriptionBlock.querySelector('form');
  const subscriptionSuccessMsg = subscriptionBlock.querySelector(`.${subscriptionSuccessMsgClassName}`);
  const subscriptionFailureMsg = subscriptionBlock.querySelector(`.${subscriptionFailureMsgClassName}`);

  if ([subscriptionBlock, subscriptionForm, subscriptionSuccessMsg, subscriptionFailureMsg].some((item) => !item)) {
    return;
  }

  subscriptionForm.addEventListener('submit', async (e) => {
    event.preventDefault();

    subscriptionSuccessMsg.classList.remove(subscriptionSuccessMsgVisibleClassName);
    subscriptionFailureMsg.classList.remove(subscriptionFailureMsgVisibleClassName);

    const endpoint = subscriptionForm.getAttribute('action');

    const data = new FormData(e.target);

    try {
      const response = await fetch(endpoint, {
        method: "post",
        body: data,
        headers: {
          accept: "application/json",
        },
      });
      const json = await response.json();

      if (json.status === "success") {
        subscriptionSuccessMsg.classList.add(subscriptionSuccessMsgVisibleClassName);
      }
    } catch (err) {
      subscriptionFailureMsg.classList.add(subscriptionFailureMsgVisibleClassName);
    }
  });

})();

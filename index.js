function derandomize() {
  let desired = '';

  const reset = () => {
    desired = '';
    console.log('derandomize RESET!');
  };

  const keypressListener = ({ key }) => {
    const max = document.getElementById('true-random-integer-generator-max').value || 0;
    if (/\d/.test(key)) {
      const newValue = desired.concat(key).replace(/^0+/, '');
      if (+newValue <= +max) {
        desired = newValue;
        console.log(`Hoping for ${desired}`);
      } else {
        console.warn(`Max value exceeded!!! Current value is ${desired}`);
      }
    }
    if (key === 'Escape') {
      reset();
    }
  };
  
  document.addEventListener('keydown', keypressListener, true);

  
  const targetNode = document.getElementById('true-random-integer-generator-result');
  
  const callback = function(mutationsList) {
    const record = mutationsList.reduce((result, { type, addedNodes }) => {
      if (!result && type === 'childList') {
        result = [...addedNodes].find(el => el.nodeType === Node.TEXT_NODE);
      }
      return result;
    }, null);
    if (record) {
      if (desired && record.textContent.trim() !== `${desired}`) {
        const min = document.getElementById('true-random-integer-generator-min').value || 0;
        if (+desired >= +min) {
          record.textContent = `${desired}\n`;
          reset();
        } else {
          console.warn(`Too small value ${desired}!!!`);
        }
      }
    }
  };
  
  const observer = new MutationObserver(callback);
  
  observer.observe(targetNode, { attributes: false, childList: true, subtree: true });
}

derandomize();
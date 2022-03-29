const log = (message, level = 'info') => {
  let color = '';

  switch (level) {
    case 'info':
      color = '\x1b[32m%s\x1b[0m';
      break;
    case 'warning':
      color = '\x1b[33m%s\x1b[0m';
      break;
    case 'error':
      color = '\x1b[31m%s\x1b[0m';
      break;
  }

  console.log(color, `[artemis] ${message}`);
};

module.exports = { log };

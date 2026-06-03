'use strict';

// chrome.devtools.inspectedWindow.eval(
//   'window.React.version',
//   (result, isException) => {
//     let message = '';
//     if (isException) {
//       message = 'This page doesn’t appear to be using React.';
//     } else {
//       message = `The page is using React v${result} ✅`;
//     }


//     (document.getElementById('message') as HTMLElement).innerHTML = message;
//   }
// );

// // Communicate with background file by sending a message
// chrome.runtime.sendMessage(
//   {
//     type: 'GREETINGS',
//     payload: {
//       message: 'Hello, my name is Pan. I am from Panel.',
//     },
//   },
//   response => {
//     console.log(response.message);
//   }
// );

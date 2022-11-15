# WasmFiddle

To run cypress testing locally:

Open a terminal and start your FE server by inputting yarn run start. Your instance should be running locally at http://localhost:3000
Then, open a second terminal and enter into the terminal yarn cypress open.

This will open up the cypress testing suite. To run e2e tests select the e2e option and then your prefered browser. This will open up that
browser that you have opened. In the cypress browser, you can click to run any of the test files in the e2e folder.

Alternatively, you can run all tests at once by entering into your second terminal yarn cypress run. This will not open the cypress testing
suite and you will see results in the terminal. Because the testing suite is not opened, any videos recorded will be deposited into a videos
folder within the ./cypress folder, additionally any failed tests will produce a screenshot folder as well.
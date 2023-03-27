# Payments Data Frontend
This is a frontend for an interview problem. 

## User Interface
There is a dashboard page containing a payment data list, filter options, a payment data creation button.

### Payment Data List
The payment data list contains id, date, sender user name, receiver user name, amount, currency, memo. These all values are in the get api response from the server. The payment data list is updated every seconds from the server. 

### Filter Options
The user can filter by filter options.
The filter options includes id, date, sender, receiver, min amount, max amount, currency, memo.

### Payment data Creation
The user can create a payment data on the payment data creation form that appears when clicking the "Create a Payment Data" button.
The user can select sender and receiver, currency and also input amount and memo.
When clicking the create button, a new payment method is created and the user can see it is on the top of the payment data list


## Starting the Frontend

Make sure you have the following prerequisites installed:
  - [Node 12 or better](https://nodejs.org/en/)
  - [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

Also, make sure the server is running. If the server doesn't run, please check the README file in the server directory

After that, you can start the frontend
```bash
$ yarn install
$ yarn build
$ yarn preview
```

You can see the console logs like the following
```log
  ➜  Local:   http://127.0.0.1:4173/
```
Then you can see the user interface on http://127.0.0.1:4173/

<b>This frontend was created using vite and used typescript, react bootstrap, redux, hook, and so on.</b>
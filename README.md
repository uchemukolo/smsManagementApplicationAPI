# smsManagementApplicationAPI
An sms application that allows users send and receive messages.

## Project Structure

The project structure follows the **MVC** (Model-View-Controller) pattern.
```
├── src
│   ├── config
│   │   └── config.js
│   ├── controllers
│   │   └── ContactController
│   │   │      └── ContactController.js
│   │   └── SmsController
│   │   │      └── SmsController.js
│   ├── helpers
│   │   └── errorHandler.js
│   ├── app.js
│   ├── middlewares
│   │   └── ContactValidator.js
│   │   └── SmsValidator.js
│   │   └── Authentication.js
│   ├── database
│   │   └── migrations
│   │   │     └── 20190821232415-create-contact.js
│   │   │     └── 20190821232739-create-sms.js
│   │   └── seeders
│   │   └── models
│   │        └── index.js
│   │        └── contact.js
│   │        └── sms.js
│   │   └── ContactController
│   │   │      └── contactRoute.js
│   │   │           └── index.js
│   │   └── SmsController
│   │   │      └── smsRoute.js
│   │   │           └── index.js
```

## Requirements

* Node.js
* npm
* PostgresDB
* Sequelize

## Getting Started

```
$ git clone https://github.com/uchemukolo/smsManagementApplicationAPI.git
$ cd smsManagementApplicationAPI
$ npm install
$ npm start                 # For development purpose
```

You should now be able to access the API via http://localhost:port/api/v1/

**NOTE:** Create a `.env` file configuration following the `.env.sample`.

## Project Details
`SMS:`
 - person sending sms
 - person receiving sms
 - message of sms
 - sms status

`Contact:`
- name of person
- phone number of person

`The following relationships are represented in the model:`
- All sms sent by a Contact are linked to them
- All sms sent to a Contact are linked to them
- Deleting a contact removes the messages they sent and references to messages they received.

## API Endpoints

<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th><th>QUERY</th></tr>
<tr><td>GET</td><td>/api/v1/contacts/:contactId</td><td>Gets a contact</td><td></td></tr>
<tr><td>POST</td><td>/api/v1/contacts/signup</td><td>Creates a contact</td><td></td></tr>
<tr><td>POST</td><td>/api/v1/contacts/login</td><td>logins a contact</td><td></td></tr>
<tr><td>DELETE</td><td>/api/v1/contacts/delete/:contactId</td><td>Deletes a contact</td><td></td></tr>
<tr><td>GET</td><td>/api/v1/messages/sent</td><td>Gets a contact sent sms</td><td></td></tr>
<tr><td>GET</td><td>/api/v1/messages/received</td><td>Gets a contact received sms</td><td></td></tr>
<tr><td>GET</td><td>/api/v1/message/:messageId</td><td>Gets a particular contact sms</td><td></td></tr>
<tr><td>POST</td><td>/api/v1/messages/:phoneNumber</td><td>Sends sms to a contact</td><td></td></tr>


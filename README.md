## Problem Description:

My application have the following database structure

- COLLECTION 1 - transactions
  - reference (unique)
  - senderWalletId 
  - amount
  - receiverWalletId nr
  - transferDescription
  - createdAt
  - updatedAt
- COLLECTION 2 - balances

  - wallet account nr (unique, 10 digits)
  - balance (each user should get 5000 when they create an acct)
  - createdAt
  - updatedAt
  - userId

- COLLECTION 3 - users
  - firstName
  - lastname
  - DOB
  - email (unique)
  - phone number (unique)


```
{
    senderAccount: account,
    receiverAccount: account,
    amount: money,
    transferDescription: transfer description
}
```

### Endpoints I used

| Method | Endpoint                           | Enable a user to:                                            |
| :----- | :--------------------------------- | :----------------------------------------------------------- |
| POST   | /signup                            | Enable user signup |
| POST   | /login                             | Enable user to login |
| POST   | /create-account                    | Enable user to create a wallet account stored in the balance collection |
| GET    | /balance/:accountNumber            | Getting balance for a particular account number              |
|        | /balance/:userId                   | Getting balance for a particular user                        |
| GET    | /balance                           | Getting all wallet accounts and their balance                       |
| POST   | /transfer                          | To make a wallet transaction to another account                     |
| GET.   | /transaction/:walletId        | gets all wallet transactions of a particular user                   |
| GET.   | /transaction/credit/:walletId | gets all credit transactions of a particular user            |
| GET.   | /transaction/debit/:walletId  | gets all debit transactions of a particular user             |

## Clarification
I implemented the following:
-  pagination, with limit of 5 values for each page
-  Authentication and Authorization for users using a middleware function
-  Validation for incoming request using Joi
- Only registered users can access all endpoints
- I used mongoDB-compass for local development

## Test coverage 

- I wrote test to cover the application using supertest
- I tested my database using mongodb-memory-server
- I tested all endpoints (GET, POST, PUT, DELETE)

## NOTE
The .env files are intentionally NOT gitignored just for the purpose of this task.

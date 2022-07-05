import express, {Request, Response, NextFunction} from 'express'
const router = express.Router();
import transactionController from '../controller/transactionController'
const  { makeTransferToAnotherAccount, getAllTransactionOfAUser, getAllCreditTransactionOfAUser, getAllDebitTransactionOfAUser} = transactionController;
router.route('/').post(makeTransferToAnotherAccount)
router.route('/:walletId').get(getAllTransactionOfAUser)
router.route('/debit/:walletId').get(getAllDebitTransactionOfAUser)
router.route('/credit/:walletId').get(getAllCreditTransactionOfAUser)
export default router;

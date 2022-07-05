import express, {Request, Response, NextFunction} from 'express'
const router = express.Router();
import balanceController from '../controller/balanceController'

const { getBalanceForParticularWalletId, getBalanceForUser, getAllAccountsAndBalance} = balanceController

router.route('/:pageno').get(getAllAccountsAndBalance)
router.route('/:walletId').get(getBalanceForParticularWalletId)
router.route('/user/:userId').get(getBalanceForUser)

export default router;

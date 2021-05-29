const { internalProviderList } = require('./providerList')

module.exports.providers = (transaction) => {
	internalProviderList.includes(transaction.payee.merchantId)
	  ? internal = true : internal = false 

	return {
		id: transaction.id,
		merchantId: transaction.payee.merchantId,
		...(transaction.payer.accountNo && ( internal ? { customerRef: transaction.payer.accountNo } : { accountNumber: transaction.payer.accountNo })),
		...(transaction.amount && ( internal ?  { clearedTxnAmount: transaction.amount } : { transactionAmount: transaction.amount })),
		...(transaction.currency && ( internal ? { txnCurrency: transaction.currency } : { currency: transaction.currency })),
		...(transaction.created_date_time && ( internal ? { txnDateTime: transaction.created_date_time } : { dateTime: transaction.created_date_time }))
	}
}
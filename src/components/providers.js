const { internalProviderList, externalProviderList } = require('./providerList')

module.exports.providers = (transaction) => {
	internalProviderList.includes(transaction.payee.merchantId)
	  ? internal = true : internal = false 

	return {
		id: transaction.id,
		merchantId: transaction.payee.merchantId,
		...(transaction.payer.accountNo && ( internal ? { accountNumber: transaction.payer.accountNo } : { customerRef: transaction.payer.accountNo })),
		...(transaction.amount && ( internal ? { transactionAmount: transaction.amount } : { clearedTxnAmount: transaction.amount })),
		...(transaction.currency && ( internal ? { currency: transaction.currency } : { txnCurrency: transaction.currency })),
		...(transaction.created_date_time && ( internal ? { dateTime: transaction.created_date_time } : { txnDateTime: transaction.created_date_time }))
	}
}
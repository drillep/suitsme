const { providers } = require('./components/providers.js')
const fs = require('fs');
const path = require('path');
const { internalProviderList, externalProviderList } = require('./components/providerList')

const buffer = path.resolve(__dirname, '../data', 'transactions.json')

const loadTransactionData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(buffer, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const transformTransactionData = (transactionData, merchantId) => {
	return Object.keys(transactionData).reduce((transactionList, item) => {
    const line = transactionData[item];
    if ( merchantId.includes(line.payee.merchantId)) {
			const provider = providers(line)
      transactionList.push(provider);
    }
    return transactionList;
  }, []);
}

const toCsv = (data) => {
	const header = Object.keys(data[0])
	return csv = [
		header.join(','),
		...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName])).join(','))
	].join('\r\n')
}

const run = async () => {
  const data = await loadTransactionData();
	const internalProviders = transformTransactionData(data, internalProviderList)
	const externalProviders = transformTransactionData(data, externalProviderList)
	
  fs.writeFileSync('./internalTransactions.csv', toCsv(internalProviders))
	fs.writeFileSync('./externalTransactions.csv', toCsv(externalProviders))
};

if (require.main === module) {
  run();
} else {
  module.exports = {
    internalProviderList,
    externalProviderList,
		loadTransactionData,
    transformTransactionData,
		toCsv,
    run,
  };
}

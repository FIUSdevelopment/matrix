
const chalk = require('chalk')

function catchError(message, err, origin, reason) { 
  console.log(chalk.gray('—————————————————————————————————'));
	console.log(
		chalk.white('['),
		chalk.red.bold('AntiCrash'),
		chalk.white(']'),
		chalk.gray(' : '),
		chalk.white.bold(message),
	);
	console.log(chalk.gray('—————————————————————————————————'));
	console.log(err, origin, reason);
}

module.exports = { catchError }

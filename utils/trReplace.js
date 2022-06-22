module.exports = (input, arr) => {
	const x = input
		.replace('/0/', arr[0])
		.replace('/1/', arr[1])
		.replace('/2/', arr[2])
		.replace('/3/', arr[3])
		.replace('/4/', arr[4])
		.replace('/5/', arr[5])
		.replace('/6/', arr[6])
		.replace('/7/', arr[7])
		.replace('/8/', arr[8])
		.replace('/9/', arr[9])
		.replace('/a/', arr[10])
		.replace('/b/', arr[11])
		.replace('/c/', arr[12])
		.replace('/d/', arr[13])
		.replace('/e/', arr[14])
		.replace('/f/', arr[15]);
	return x;
};
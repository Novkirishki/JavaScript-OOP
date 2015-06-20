// Write a function that finds all the prime numbers in a range
// It should return the prime numbers in an array
// It must throw an Error if any of the range params is not convertible to Number
// It must throw an Error if any of the range params is missing

function findPrimes(start, end) {
	var a = Number(start),
		b = Number(end),
		result = [],
		num,
		i,
		isPrime = true;
	if (a === undefined || b === undefined) {
		throw new Error("Missing parameter");
	} else if (isNaN(a) || isNaN(b)) {
		throw new Error("Invalid range");
	} else {
		for (num = a; num < b+1; num+=1) {
			for (i = 2; i <= Math.sqrt(num); i+=1) {
				if (num % i == 0) {
					isPrime = false;
					break;
				}
			}
			if (isPrime === true && num > 1) {
				result.push(num);
			}
			isPrime = true;			
		}
	}
	return result;
}

console.log(findPrimes(0,10));
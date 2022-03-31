(function () {
	var maxmindCity = (
			getCityFromMaxmind &&
			getCityFromMaxmind.city &&
			getCityFromMaxmind.city.names &&
			getCityFromMaxmind.city.names.en
			) ? getCityFromMaxmind.city.names.en : undefined;

	var maxmindCountry = (
			getCityFromMaxmind &&
			getCityFromMaxmind.country &&
			getCityFromMaxmind.country.names &&
			getCityFromMaxmind.country.names.en
			) ? getCityFromMaxmind.country.names.en : undefined;

	if (maxmindCountry && maxmindCity) {
		return maxmindCity + ', '+ maxmindCountry;
	}

	if (maxmindCity) {
		return maxmindCity;
	}

	if (maxmindCountry) {
		return maxmindCountry;
	}

	return ' ';
})();
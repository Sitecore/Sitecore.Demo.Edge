(function () {
	return azureTranslation
				&& azureTranslation.result
				&& azureTranslation.result.length > 0
				&& azureTranslation.result[0]
				&& azureTranslation.result[0].translations
				&& azureTranslation.result[0].translations.length > 0
				&& azureTranslation.result[0].translations[0]
				&& azureTranslation.result[0].translations[0].text
		? azureTranslation.result[0].translations[0].text
		: welcomeText ;
})();
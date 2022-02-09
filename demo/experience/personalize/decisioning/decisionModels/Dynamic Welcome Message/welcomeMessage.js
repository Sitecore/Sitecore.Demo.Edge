(function() {
	function getTokenFromString(input) {
		var tokenStart = input.indexOf('{{');
		if (tokenStart === -1) {
			return undefined;
		}

		var tokenEnd = input.indexOf('}}');
		if (tokenEnd === -1) {
			return undefined;
		}

		var token = input.substr(tokenStart + 2, tokenEnd - tokenStart - 2);

		return token;
	}

	// messageTemplate might not exist if no decision table rule was matched.
	var messageTemplateString = this.messageTemplate;

	if (messageTemplateString) {
		var message = messageTemplateString;
		var token = getTokenFromString(message);

		while (token) {
			var tokenReplacement = this[token];
			tokenReplacement = !tokenReplacement ? '' : tokenReplacement;

			message = message.replace('{{' + token + '}}', tokenReplacement);

			token = getTokenFromString(message);
		}

		return message;
	}

	return undefined;
})();
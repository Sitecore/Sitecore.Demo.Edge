$synchedFilesMappings = @(
	@(
		".\kiosk\services\BoxeverService.tsx",
		".\Website\src\rendering\src\services\BoxeverService.tsx"
	),
	@(
		".\kiosk\stylelint.config.js",
		".\tv\stylelint.config.js",
		".\Website\src\rendering\stylelint.config.js"
	),
	@(
		".\kiosk\postcss.config.js",
		".\tv\postcss.config.js",
		".\Website\src\rendering\postcss.config.js"
	),
	@(
		".\kiosk\next-env.d.ts",
		".\tv\next-env.d.ts",
		".\Website\src\rendering\next-env.d.ts"
	),
	@(
		".\kiosk\.prettierrc",
		".\tv\.prettierrc",
		".\Website\src\rendering\.prettierrc"
	),
	@(
		".\kiosk\.vscode\settings.json",
		".\tv\.vscode\settings.json",
		".\Website\src\rendering\.vscode\settings.json"
	)
)

foreach ($synchedFilesMapping in $synchedFilesMappings) {
	$firstFilePath = $synchedFilesMapping[0]
	$firstFileHash = (Get-FileHash $firstFilePath).hash

	for ($synchedFileIndex = 1; $synchedFileIndex -lt $synchedFilesMapping.Length; $synchedFileIndex++) {
		$filePath = $synchedFilesMapping[$synchedFileIndex]
		$fileHash = (Get-FileHash $filePath).hash

		if ($fileHash -ne $firstFileHash) {
			Throw "'$firstFilePath' and '$filePath' are out of sync."
		}
	}
}

using System;
using System.Threading.Tasks;
using System.IO;
using Sitecore.Demo.Init.Model;
using Microsoft.Extensions.Logging;
using System.Linq;
using HtmlAgilityPack;

namespace Sitecore.Demo.Init.Jobs
{
	class UpdateDamUri : TaskBase
	{
		public UpdateDamUri(InitContext initContext)
			: base(initContext)
		{
		}

		public static string damUrl = Environment.GetEnvironmentVariable("DAM_URL");
		public static string rootpath = @"C:\app\src\items\content\EdgeWebsite";

		public async Task Run()
		{
			if (string.IsNullOrWhiteSpace(damUrl))
			{
				Log.LogWarning($"{this.GetType().Name} has been skipped, it does not execute if the DAM_URL variable is not passed to the Init container");
				return;
			}

			Log.LogInformation($"{this.GetType().Name} started");

			if (!Directory.Exists(rootpath))
			{
				Log.LogWarning($"{this.GetType().Name} did not complete - could not find root path");
				return;
			}

			var files = Directory.EnumerateFiles(rootpath, "*.yml", SearchOption.AllDirectories);	
			foreach (var filepath in files)
			{
				PerformUpdate(filepath);
			}

			Log.LogInformation($"{this.GetType().Name} complete");
			await Complete();
		}

		private void PerformUpdate(string filepath)
		{
			var deserializer = new YamlDotNet.Serialization.Deserializer();
			YamlItemModel yamlObject = new YamlItemModel();
			string fileContents = String.Empty;

			using (var reader = new StreamReader(filepath)) {
				yamlObject = deserializer.Deserialize<YamlItemModel>(reader);
				reader.DiscardBufferedData();
				reader.BaseStream.Seek(0, SeekOrigin.Begin);
				fileContents = reader.ReadToEnd();
			}

			ReadYamlFile(yamlObject, filepath, fileContents);
		}

		private void ReadYamlFile(YamlItemModel yamlObject, string filepath, string fileContents)
		{
			if (yamlObject != null & yamlObject?.SharedFields != null)
			{
				foreach (var sharedField in yamlObject?.SharedFields)
				{
					if ((bool)(sharedField?.Hint.StartsWith("__")))
						continue;
					else if (sharedField?.Value != null && (bool)(sharedField?.Value.Contains("stylelabs-content-id")))
						UpdateFile(filepath, GetDamHost(sharedField.Value), new System.Uri(damUrl)?.Host, fileContents);
				}
			}
			
			if (yamlObject != null & yamlObject?.Languages != null)
			{
				foreach (var language in yamlObject?.Languages)
				{
					if (language?.Fields != null)
					{
						foreach (var field in language?.Fields)
						{
							if ((bool)(field?.Hint.StartsWith("__")))
								continue;
							else if (field?.Value != null && (bool)(field?.Value.Contains("stylelabs-content-id")))
								UpdateFile(filepath, GetDamHost(field.Value), new System.Uri(damUrl)?.Host, fileContents);
						}
					}
					if (language?.Versions != null)
					{
						foreach (var version in language?.Versions)
						{
							if (version?.Fields != null)
							{
								foreach (var field in version?.Fields)
								{
									if ((bool)(field?.Hint.StartsWith("__")))
										continue;
									else if (field?.Value != null && (bool)(field?.Value.Contains("stylelabs-content-id")))
										UpdateFile(filepath, GetDamHost(field.Value), new System.Uri(damUrl)?.Host, fileContents);
								}
							}
						}
					}
				}
			}
		}

		private void UpdateFile(string filepath, string existingValue, string newValue, string fileContents)
		{
			using (var writer = new StreamWriter(filepath))
			{
				writer.Write(
					fileContents.Replace(existingValue, newValue)
					);
			}
		}

		private string GetDamHost(string existingFieldValue)
		{
			if (string.IsNullOrWhiteSpace(existingFieldValue) || !existingFieldValue.Contains("stylelabs-content-id"))
				return string.Empty;

			var htmlDoc = new HtmlDocument();
			htmlDoc.LoadHtml(existingFieldValue);
			var imageSrc = htmlDoc?.DocumentNode?.ChildNodes
				?.FirstOrDefault()?.Attributes
				?.FirstOrDefault(i => i?.Name == "src");
			var imageSrcUri = new System.Uri(imageSrc.Value);
			
			if (imageSrcUri == null)
				return string.Empty;

			var imageSrcHost = imageSrcUri.Host;

			if (imageSrcHost == null)
				return string.Empty;

			return imageSrcHost;
		}
	}
}

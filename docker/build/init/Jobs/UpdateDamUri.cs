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
				UpdateYaml(filepath);
			}

			Log.LogInformation($"{this.GetType().Name} complete");
			await Complete();
		}

		private void UpdateYaml(string filepath)
		{
			var deserializer = new YamlDotNet.Serialization.Deserializer();
			YamlItemModel yamlObjectUpdated = new YamlItemModel();

			using (var reader = new StreamReader(filepath)) {
				YamlItemModel yamlObject = deserializer.Deserialize<YamlItemModel>(reader);
				yamlObjectUpdated = UpdateValues(yamlObject);
			}
			
			if (yamlObjectUpdated != null)
				WriteYaml(yamlObjectUpdated, filepath);
		}

		private void WriteYaml(YamlItemModel yamlObject, string filepath)
		{
			using (var writer = new StreamWriter(filepath))
			{
				writer.WriteLine("---");
				var serializer = new YamlDotNet.Serialization.Serializer();
				serializer.Serialize(writer, yamlObject);
			}
		}

		private YamlItemModel UpdateValues(YamlItemModel yamlObject)
		{
			var updateFlag = false;

			if (yamlObject != null & yamlObject?.SharedFields != null)
			{
				foreach (var sharedField in yamlObject?.SharedFields)
				{
					if ((bool)(sharedField?.Hint.StartsWith("__")))
						continue;
					else if (sharedField?.Value != null && (bool)(sharedField?.Value.Contains("stylelabs-content-id")))
					{
						updateFlag = true;
						sharedField.Value = GetUpdatedDamHost(sharedField.Value);
					}
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
							{
								updateFlag = true;
								field.Value = GetUpdatedDamHost(field.Value);
							}
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
									{
										updateFlag = true;
										field.Value = GetUpdatedDamHost(field.Value);
									}
								}
							}
						}
					}
				}
			}
			
			return updateFlag ? yamlObject : null;
		}

		private string GetUpdatedDamHost(string existingFieldValue)
		{
			if (string.IsNullOrWhiteSpace(existingFieldValue) || !existingFieldValue.Contains("stylelabs-content-id"))
				return string.Empty;	

			var damUri = new System.Uri(damUrl);
			var damHost = damUri?.Host;

			if (string.IsNullOrWhiteSpace(damHost))
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

			return existingFieldValue?.Replace(imageSrcHost, damHost);
		}
	}
}

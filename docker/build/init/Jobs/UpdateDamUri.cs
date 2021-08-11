using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;
using Sitecore.Demo.Init.Model;
using Sitecore.Demo.Init.Extensions;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using HtmlAgilityPack;
using YamlDotNet.RepresentationModel;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace Sitecore.Demo.Init.Jobs
{
	class UpdateDamUri : TaskBase
	{
		public UpdateDamUri(InitContext initContext)
			: base(initContext)
		{
		}

		public static string damUrl = Environment.GetEnvironmentVariable("DAM_CONTENTHUB");

		public async Task Run()
		{
			if (this.IsCompleted())
			{
				Log.LogWarning($"{this.GetType().Name} is already complete, it will not execute this time");
				return;
			}
			
			if (string.IsNullOrWhiteSpace(damUrl))
			{
				Log.LogWarning($"{this.GetType().Name} has been skipped, it does not execute if the DAM_URL variable is not passed to the Init container");
			 	return;
			}

			Log.LogInformation($"UpdateDamUri() started");

		  	UpdateValues();

		  	Log.LogInformation("UpdateDamUri() complete");
			await Complete();
		}

		private void UpdateValues()
		{
		  var filepath = @"C:\app\src\items\content\EdgeWebsite\home.yml";



		  using (var stream = File.OpenRead(filepath))
		  {
			 using (var reader = new StreamReader(stream))
			 {
				// Load the stream
				//var yaml = new YamlStream();
				//yaml.Load(reader);
				Log.LogInformation("UpdateDamUri() test1***: " + reader);

				var deserializer = new Deserializer();

				//yml contains a string containing your YAML
				var yamlKvp = deserializer.Deserialize<Dictionary<string, string>>(reader);
				//System.Console.WriteLine($"{p.Name} is {p.Age} years old and lives at {h.Street} in {h.City}, {h.State}.");

				//Log.LogInformation("UpdateDamUri() test0***: " + yamlElements.ToString());


				//var yamlElements = ((YamlMappingNode)yaml.Documents[0].RootNode).Children.FirstOrDefault(i => i.Key.ToString() == "Languages").Value;
				//Log.LogInformation("UpdateDamUri() test2***: " + yamlElements.ToString());

				foreach (var kvp in yamlKvp)
				{
				    Log.LogInformation("UpdateDamUri() test3***: " + kvp.Key + " *|* " + kvp.Value);
				    //foreach (var elementL2 in elementL1.AllNodes)
				    //{
				    //    Log.LogInformation("UpdateDamUri() test4***: " + elementL2.ToString() + " *|* " );
				    //    foreach (var elementL3 in elementL2.AllNodes)
				    //    {
				    //	   Log.LogInformation("UpdateDamUri() test5***: " + elementL3.ToString() + " *|* " + elementL3);
				    //    }
				    //}
				}

				//var buffer = new StringBuilder();
				//using (var writer = new StringWriter(buffer))
				//{
				//yaml.Save(writer);
				//Log.LogInformation("UpdateDamUri() test2***: " + writer.ToString());
				//}

				// the rest
			 }
		  }

		  //foreach (var itemId in itemIdList)
		  //{
		  //var existingFieldValue = ReadItemField(hostCM, token, itemId);

		  //if (string.IsNullOrWhiteSpace(existingFieldValue))
		  //continue;

		  //var updatedDamHost = GetUpdatedDamHost(existingFieldValue);

		  //if (string.IsNullOrWhiteSpace(updatedDamHost))
		  //continue;

		  //var escapedUpdatedDamHost = updatedDamHost.Replace("\"", "\\\"");

		  //UpdateItemField(hostCM, token, itemId, escapedUpdatedDamHost);
		  //}
	   }

        private string ReadItemField(string hostCM, string token, string itemId)
        {
            try
            {
                var cookieClient = new CookieWebClient();
                cookieClient.Encoding = System.Text.Encoding.UTF8;
                cookieClient.Headers.Add("token", token);
                cookieClient.Headers.Add("Content-Type", "application/json");

                var stringResponse = cookieClient.DownloadString(
                    new Uri(hostCM + $"/sitecore/api/ssc/item/{itemId}?database=master&fields=image"));

                var jsonDictionarySet = JsonConvert.DeserializeObject<Dictionary<String, String>>(stringResponse);
                return jsonDictionarySet?.FirstOrDefault(x => x.Key == "image").Value;
            }
            catch (Exception ex)
            {
                Log.LogError($"Failed to read item field, itemId: {itemId}", ex);
                return null;
            }
        }

        private static string GetUpdatedDamHost(string existingFieldValue)
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

		private void UpdateItemField(string hostCM, string token, string itemId, string escapedUpdatedDamHost)
		{
            try
            {
                var cookieClient = new CookieWebClient();
                cookieClient.Encoding = System.Text.Encoding.UTF8;
                cookieClient.Headers.Add("token", token);
                cookieClient.Headers.Add("Content-Type", "application/json");

                cookieClient.UploadDataAsync(
                    new Uri(hostCM + $"/sitecore/api/ssc/item/{itemId}?database=master"),
                    "PATCH",
                    System.Text.Encoding.UTF8.GetBytes($"{{\"image\": \"{escapedUpdatedDamHost}\" }}"));
            }
            catch (Exception ex)
            {
				Log.LogError($"Failed to update item field, itemId: {itemId}", ex);
            }
        }
	}
}

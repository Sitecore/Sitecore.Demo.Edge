using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Web.UI;
using Stylelabs.M.Sdk.Contracts.Querying;
using Stylelabs.M.Sdk.WebClient;
using Stylelabs.M.Sdk.WebClient.Authentication;


namespace Sitecore.Demo.Edge.Website.Utilities
{
    public partial class Contenthub : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RegisterAsyncTask(new PageAsyncTask(PageLoadContent));
        }


        public async Task PageLoadContent()
        {
            connectionStatus.InnerHtml += "Hello";
        }

        public async Task<List<string>> LoadContent()
        {
            try
            {
                List<string> names = new List<string>();

                //connectionStatus.InnerText = Sitecore.Configuration.Settings.GetSetting("cmp_url");
                //Sitecore.Diagnostics.Log.Info("Topaz was here : " + Sitecore.Configuration.Settings.GetSetting("cmp_url"), this);
                Uri endpoint = new Uri("https://playsummit.sitecoresandbox.cloud/");
                //Uri endpoint = new Uri("https://playsummit-demotemplate-v2.sitecoresandbox.cloud/");

                // Enter your credentials here
                OAuthPasswordGrant oauth = new OAuthPasswordGrant
                {
                    ClientId = "5hE3CInyFsuPnbaCwtAnNiMcfX0LPSm7",
                    ClientSecret = "0z2WOq5UrcbhLb6ybCH2R4g19nKPWGlzTJTF3DGpohk7IDXH0d8fJOC7iAJgErPj",
                    //ClientId = "8jmM1fSp65gshJmWrNIZZm6bU7E2QJEh", ClientSecret = "6W1VwtYh77JmDkpwW2hCqZQDmzynvk2Twkkeb3qplNRdDgQ9l3D7h1O79ccMjOUq",
                    UserName = "demo_api_user",
                    Password = "Sitecore12!@"
                };

                IWebMClient client = MClientFactory.CreateMClient(endpoint, oauth);

                await client.TestConnectionAsync();
                await Task.Delay(5000);

                IIdQueryResult entities =
                    await client.Entities.GetIdsByDefinitionAsync("M.Content", 0, 100);

                names.Add(Sitecore.Configuration.Settings.GetSetting("Sitecore_ConnectionStrings_DAM.ContentHub"));
                names.Add(Sitecore.Configuration.Settings.GetSetting("cmp_url"));

                foreach (var item in entities.Items)
                {
                    var entity = await client.Entities.GetAsync(item);

                    var dateDiff = GetRandomDate();
                    DateTime pDate = DateTime.Now.AddDays(dateDiff);
                    DateTimeOffset pDateDiff = DateTimeOffset.Now.AddDays(dateDiff);
                    //entity.SetPropertyValue("Content.PublishedOn", pDate);
                    entity.SetPropertyValue("Content.PublicationDate", pDateDiff);

                    //long id = await client.Entities.SaveAsync(entity);
                    Thread.Sleep(500);

                    names.Add(" Id: " + entity.Id);
                    names.Add(" Name: " + entity.GetPropertyValue("Content.Name"));

                    names.Add(">> Content.PublicationDate: " + entity.GetPropertyValue("Content.PublicationDate"));
                    names.Add(" ");

                    //foreach (var entityProperty in entity.Properties)
                    //{
                    //    names.Add("// " + entityProperty.Name + entityProperty.DataType + " >> " + entity.GetPropertyValue(entityProperty.Name));
                    //}
                }
                return names;
            }
            catch (Exception ex)
            {
                connectionStatus.InnerHtml += ex.InnerException;
            }

            return null;
        }

        public int GetRandomDate()
        {
            Random rnd = new Random();
            int diff = rnd.Next(0, 15);

            int multiplier = rnd.Next(0, 2);
            return multiplier == 0 ? diff : diff * -1;
        }

    }
}
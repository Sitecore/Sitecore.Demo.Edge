using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Stylelabs.M.Sdk.Contracts.Querying;
using Stylelabs.M.Sdk.WebClient;
using Stylelabs.M.Sdk.WebClient.Authentication;


namespace Sitecore.Demo.Edge.Website.Utilities
{
    public partial class Contenthub : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //RegisterAsyncTask(new PageAsyncTask(LoadContent));
        }

        //public async Task LoadSomeData()
        public async Task<List<string>> LoadContent()
        {
            try
            {
                Uri endpoint = new Uri("https://playsummit.sitecoresandbox.cloud/");

                // Enter your credentials here
                OAuthPasswordGrant oauth = new OAuthPasswordGrant
                {
                    //Name; "WebClient,";
                    ClientId = "5hE3CInyFsuPnbaCwtAnNiMcfX0LPSm7",
                    ClientSecret = "0z2WOq5UrcbhLb6ybCH2R4g19nKPWGlzTJTF3DGpohk7IDXH0d8fJOC7iAJgErPj",
                    UserName = "demo-api-user",
                    Password = "Sitecore12!@"
                };

                IWebMClient client = MClientFactory.CreateMClient(endpoint, oauth);

                //client.TestConnectionAsync();
                await Task.Delay(5000);

                IIdQueryResult entities =
                    await client.Entities.GetIdsByDefinitionAsync("M.Content", 0, 100);

                List<string> names = new List<string>();
                foreach (var item in entities.Items)
                {
                    var entity = await client.Entities.GetAsync(item);

                    var dateDiff = GetRandomDate();
                    DateTime pDate = DateTime.Now.AddDays(dateDiff);
                    DateTimeOffset pDateDiff = DateTimeOffset.Now.AddDays(dateDiff);
                    //entity.SetPropertyValue("Content.PublishedOn", pDate);
                    entity.SetPropertyValue("Content.PublicationDate", pDateDiff);

                    long id = await client.Entities.SaveAsync(entity);
                    Thread.Sleep(500);


                    names.Add(" Id: " + entity.Id);
                    names.Add(" Name: " + entity.GetPropertyValue("Content.Name"));

                    names.Add("// Content.PublicationDate: " + entity.GetPropertyValue("Content.PublicationDate"));
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
                connectionStatus.InnerText += ex.Message;
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
using System;
using System.Collections.Generic;
using System.Configuration;
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
            connectionStatus.InnerHtml = "";
            ResultGrid.DataSource = null;
            ResultGrid.DataBind();
        }

        protected async void GeneratePublicationDates(object sender, EventArgs e)
        {
            connectionStatus.InnerHtml = "";
            ResultGrid.DataSource = null;
            ResultGrid.DataBind();

            string clientid = ClientIdField.Text;
            string clientsecret = ClientSecretField.Text;
            if (string.IsNullOrEmpty(clientid) || string.IsNullOrEmpty(clientsecret))
            {
                connectionStatus.InnerHtml += "client id and secret missing.";
                connectionStatus.InnerHtml += "Authentication values are missing. Please fill in the Id and Secret field above.";
            }

            string damUrl = ConfigurationManager.ConnectionStrings["DAM.ContentHub"].ToString();
            if (string.IsNullOrEmpty(damUrl))
            {
                connectionStatus.InnerHtml = "No content hub instance found.";
            }

            try
            {
                var task = GetResponseAsync(damUrl, clientid, clientsecret);
                var items = await task;
                ResultGrid.DataSource = items;
                ResultGrid.DataBind();
            }
            catch (Exception es)
            {
                connectionStatus.InnerHtml = "overall error";
                connectionStatus.InnerHtml += es.Message;
            }
        }

        public async Task<List<string>> GetResponseAsync(string damUrl, string clientid, string clientsecret)
        {
            try
            {
                Uri endpoint = new Uri(damUrl);
                List<string> names = new List<string>();
                IWebMClient client = null;

                try
                {
                    Diagnostics.Log.Info("damurl = " + damUrl, this);
                    Diagnostics.Log.Info("clientid = " + clientid, this);
                    Diagnostics.Log.Info("clientsecret = " + clientsecret, this);

                    OAuthPasswordGrant oauth = new OAuthPasswordGrant
                    {
                        //ClientId = clientid.ToString(), //HALP: This passed in values are not working for some reason.
                        //ClientSecret = clientsecret.ToString(),
                        ClientId = "8jmM1fSp65gshJmWrNIZZm6bU7E2QJEh", //BUT when i type it in like this it works...
                        ClientSecret = "6W1VwtYh77JmDkpwW2hCqZQDmzynvk2Twkkeb3qplNRdDgQ9l3D7h1O79ccMjOUq",
                        UserName = "demo-api-user",
                        Password = "Sitecore12!@"
                    };
                    client = MClientFactory.CreateMClient(endpoint, oauth);
                    //await client.TestConnectionAsync();
                    await Task.Delay(500);
                    names.Add("Connected");
                }
                catch (Exception ex)
                {
                    connectionStatus.InnerHtml = "connecting";
                    connectionStatus.InnerHtml += ex.Message;
                    connectionStatus.InnerHtml += ex.InnerException;
                }

                IIdQueryResult entities =
                    await client.Entities.GetIdsByDefinitionAsync("M.Content", 0, 100);

                names.Add(entities.Items.Count.ToString());

                names.Add(ConfigurationManager.ConnectionStrings["DAM.ContentHub"].ToString());

                foreach (var item in entities.Items)
                {
                    var entity = await client.Entities.GetAsync(item);

                    var dateDiff = GetRandomDate();
                    DateTime pDate = DateTime.Now.AddDays(dateDiff);
                    DateTimeOffset pDateDiff = DateTimeOffset.Now.AddDays(dateDiff);
                    entity.SetPropertyValue("Content.PublishedOn", pDate);
                    entity.SetPropertyValue("Content.PublicationDate", pDateDiff);

                    long id = await client.Entities.SaveAsync(entity);
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
                connectionStatus.InnerHtml = ex.Message;
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
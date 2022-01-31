using System;
using System.Collections.Generic;
using System.Configuration;
using System.Threading;
using System.Threading.Tasks;
using System.Web.UI;
using Stylelabs.M.Framework.Essentials.LoadOptions;
using Stylelabs.M.Sdk.Contracts.Querying;
using Stylelabs.M.Sdk.WebClient;
using Stylelabs.M.Sdk.WebClient.Authentication;


namespace Sitecore.Demo.Edge.Website.Utilities
{
    public partial class Contenthub : System.Web.UI.Page
    {
        protected string damurl = "";
        protected string username = "";
        protected string password = "";
        protected string clientid = "";
        protected string clientsecret = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            messageDiv.InnerHtml = "";
            ResultGrid.DataSource = null;
            ResultGrid.DataBind();
        }

        protected void getAuthenticationValues()
        {
            messageDiv.InnerHtml = "";
            ResultGrid.DataSource = null;
            ResultGrid.DataBind();

            clientid = ClientIdField.Text;
            clientsecret = ClientSecretField.Text;
            if (string.IsNullOrEmpty(clientid) || string.IsNullOrEmpty(clientsecret))
            {
                messageDiv.InnerHtml += "client id and secret missing.";
                messageDiv.InnerHtml += "Authentication values are missing. Please fill in the Id and Secret field above.";
            }

            damurl = ConfigurationManager.ConnectionStrings["DAM.ContentHub"].ToString();
            if (string.IsNullOrEmpty(damurl))
            {
                messageDiv.InnerHtml = "No content hub instance found.";
            }
        }

        protected async void CheckConnection(object sender, EventArgs e)
        {
            getAuthenticationValues();
            try
            {
                var task = GetConnectionAsync(damurl, clientid, clientsecret);
                var items = await task;
                ResultGrid.DataSource = items;
                ResultGrid.DataBind();
            }
            catch (Exception es)
            {
                messageDiv.InnerHtml = "overall error";
                messageDiv.InnerHtml += es.Message;
            }
        }


        protected async void GeneratePublicationDates(object sender, EventArgs e)
        {
            getAuthenticationValues();

            try
            {
                var task = GetResponseAsync(damurl, clientid, clientsecret);
                var items = await task;
                ResultGrid.DataSource = items;
                ResultGrid.DataBind();
            }
            catch (Exception es)
            {
                messageDiv.InnerHtml = "overall error";
                messageDiv.InnerHtml += es.Message;
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
                        ClientId = clientid.ToString(),
                        ClientSecret = clientsecret.ToString(),
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
                    messageDiv.InnerHtml = "connecting";
                    messageDiv.InnerHtml += ex.Message;
                    messageDiv.InnerHtml += ex.InnerException;
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
                }
                return names;
            }
            catch (Exception ex)
            {
                messageDiv.InnerHtml = ex.Message;
                messageDiv.InnerHtml += ex.InnerException;
            }

            return null;
        }

        public async Task<List<string>> GetConnectionAsync(string damUrl, string clientid, string clientsecret)
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
                        ClientId = clientid.ToString(), //HALP: This passed in values are not working for some reason.
                        ClientSecret = clientsecret.ToString(),
                        UserName = "demo-api-user",
                        Password = "Sitecore12!@"
                    };
                    client = MClientFactory.CreateMClient(endpoint, oauth);
                    await client.TestConnectionAsync();
                    await Task.Delay(500);
                    names.Add("Connected Successfully.");
                }
                catch (Exception ex)
                {
                    messageDiv.InnerHtml = "connecting";
                    messageDiv.InnerHtml += ex.Message;
                    messageDiv.InnerHtml += ex.InnerException;
                }
                return names;
            }
            catch (Exception ex)
            {
                messageDiv.InnerHtml = ex.Message;
                messageDiv.InnerHtml += ex.InnerException;
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
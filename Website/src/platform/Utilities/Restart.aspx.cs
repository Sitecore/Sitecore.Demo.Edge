using System;
using System.Web;

namespace Sitecore.Demo.Edge.Website.Utilities
{
	public partial class Restart : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
            //Try unloading appdomain
            try
            {
                //note that UnloadAppDomain requires full trust
                HttpRuntime.UnloadAppDomain();
            }
            catch (Exception ex)
            {
                //if exception occoured then log exception
                Sitecore.Diagnostics.Log.Error("Restart Request Failed", ex, this);
            }
        }
    }
}

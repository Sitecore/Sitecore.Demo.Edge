using System;
using System.Diagnostics;
using System.Web;

namespace Sitecore.Demo.Edge.Website.Utilities
{
	public partial class Restart : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
            //First try killing your worker process
            try
            {
                //Get the current process
                Process process = Process.GetCurrentProcess();
                // Kill the current process
                process.Kill();
                // if your application have no rights issue then it will restart your app pool
                return;
            }
            catch (Exception ex)
            {
                //if exception occurred then log exception
                Sitecore.Diagnostics.Log.Error("Restart Request Failed", ex, this);

            }

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

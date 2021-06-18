using System;

namespace Sitecore.Demo.Fitness.Project.AppItems.Utilities
{
	public partial class Restart : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			Sitecore.Install.Installer.RestartServer();
		}
	}
}

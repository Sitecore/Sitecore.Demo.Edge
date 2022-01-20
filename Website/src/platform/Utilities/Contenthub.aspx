<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Contenthub.aspx.cs" Inherits="Sitecore.Demo.Edge.Website.Utilities.Contenthub" Async="true" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <%
        var url = ConfigurationManager.ConnectionStrings["DAM.ContentHub"].ToString();
        var authUrl = url + "/en-us/admin/oauthclients";
    %>
    <div>
        Connected to: <% = url%>
    </div>
    <div>
        <a target="_blank" href='<% = authUrl%>'>Click here to go get the authentication parameters.</a>
    </div>
    <form runat="server">
        <div id="connectionStatus" runat="server"></div>
        <div>
            <asp:Label runat="server" Text="Client id:"></asp:Label>
            <br />
            <asp:TextBox runat="server" ID="ClientSecretField"></asp:TextBox>
        </div>
        <div>
            <asp:Label runat="server" Text="Client secret:"></asp:Label>
            <br />
            <asp:TextBox runat="server" ID="ClientIdField"></asp:TextBox>
        </div>
        <div>
            <asp:Button runat="server" OnClick="GeneratePublicationDates" ID="GenerateDateButton" Text="Generate Dates" />
        </div>
        <div>
            <asp:GridView runat="server" ID="ResultGrid"></asp:GridView>
        </div>
    </form>
</body>
</html>

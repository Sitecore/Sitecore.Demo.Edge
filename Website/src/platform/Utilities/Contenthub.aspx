<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Contenthub.aspx.cs" Inherits="Sitecore.Demo.Edge.Website.Utilities.Contenthub" Async="true" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <div>
        <div id="connectionStatus" runat="server"></div>
        <form runat="server">
            <asp:GridView runat="server" SelectMethod="LoadContent"></asp:GridView>
        </form>
    </div>
</body>
</html>

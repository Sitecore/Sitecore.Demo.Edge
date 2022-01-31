<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Contenthub.aspx.cs" Inherits="Sitecore.Demo.Edge.Website.Utilities.Contenthub" Async="true" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Content Hub Tools</title>
    <style>
        div, table {
            font-size: 18px;
            padding: 5px;
            width: 100%;
        }

        input {
            width: 50%;
            padding: 5px;
        }

        #messageDiv {
            color: red;
        }

        table tbody {
            vertical-align: top;
        }

            table tbody td {
                width: 50%;
            }
    </style>
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
        <a target="_blank" href='<% = authUrl%>'>Click here and copy the Client id and secret from Content Hub and input it below.</a>
    </div>
    <form runat="server">
        <table>
            <tr>
                <td>
                    <div id="connectionStatus" runat="server"></div>
                    <div id="messageDiv" runat="server"></div>
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
                        <asp:Button runat="server" OnClick="CheckConnection" ID="CheckConnectionButton" Text="Test Connection" />
                    </div>
                    <div>
                        <asp:Button runat="server" OnClick="GeneratePublicationDates" ID="GenerateDateButton" Text="Generate Dates" />
                    </div>
                </td>
                <td>
                    <div>
                        <asp:GridView runat="server" ID="ResultGrid" ShowHeader="false"></asp:GridView>
                    </div>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>

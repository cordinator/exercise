using Microsoft.AspNet.Identity;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Thinkovator.Exercise.Service
{
  public interface IEmailService: IIdentityMessageService
  {
    string Destination { get; set; }
  }

  public class EmailService : IEmailService 
  {
    public string Destination { get; set; }

    public async Task SendAsync(IdentityMessage message)
    {
      var mailClient = ConfigurationManager.AppSettings["mailClient"];
      var port = ConfigurationManager.AppSettings["mailPort"];
      var from = ConfigurationManager.AppSettings["mailAccount"];
      var password = ConfigurationManager.AppSettings["mailPassword"];

      var fromAddress = new MailAddress(from, "(do not reply)");
      var toAddresss = new MailAddress(Destination);

      var email = new MailMessage(fromAddress, toAddresss)
      {
        Subject = message.Subject,
        Body = message.Body,
        IsBodyHtml = true
      };

      using (var client = new SmtpClient(mailClient, int.Parse(port)))
      {
        client.EnableSsl = false;
        client.DeliveryMethod = SmtpDeliveryMethod.Network;
        client.UseDefaultCredentials = false;
        client.Credentials = new NetworkCredential(from, password);

        await client.SendMailAsync(email);
      }
    }
  }
}
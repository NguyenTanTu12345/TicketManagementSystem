using MailKit.Net.Smtp;
using MimeKit;

namespace TicketManagementSystem_BE.Services
{
    public interface ICustomEmailService
    {
        public void SendEmail(string from, string password, string to, string subject, string content);
    }

    public class CustomEmailService : ICustomEmailService
    {
        public void SendEmail(string from, string password, string to, string subject, string content)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Hue Festival", from));
            emailMessage.To.Add(new MailboxAddress(to, to));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html){
                Text = string.Format(content)
            };
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect("smtp.gmail.com", 465, true);
                    client.Authenticate(from, password);
                    client.Send(emailMessage);
                }
                catch (Exception ex) 
                {
                    throw new Exception(ex.Message);
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Net.Mail;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace TextAnalyticsPortal.Controllers
{
    
    public class HomeController : Controller
    {
        private IConfiguration configuration;
        public HomeController(IConfiguration iConfig)
        {
            configuration = iConfig;
        }

        public IActionResult Login(string returnUrl)
        {
            return Challenge(new AuthenticationProperties { RedirectUri = "/" }, OpenIdConnectDefaults.AuthenticationScheme);
        }


        public IActionResult Index()
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            ViewBag.FullName = User.Identity.IsAuthenticated ? claims.First(c => c.Type == "name").Value : "";
            ViewBag.Email = User.Identity.IsAuthenticated ? claims.First(c => c.Type == "preferred_username").Value : ""; 
            ViewBag.Auth = User.Identity.IsAuthenticated;
            return View("Index");
        }

        static bool RedirectionCallback(string url)
        {
            // Return true if the URL is an HTTPS URL.
            return url.ToLower().StartsWith("https://");
        }
         [Authorize]
        public bool sendEmail()
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            string body = "<br/><br/><table style=\"border-collapse:collapse; border-style:solid; border-color:#A3A3A3; border-width:1pt\"><tbody><tr><td style=\"border-style:solid; border-color:#A3A3A3; border-width:1pt; vertical-align:top; width:2.3in; padding:2.0pt 3.0pt 2.0pt 3.0pt\"><b>Name</b></td><td style=\"border-style:solid; border-color:#A3A3A3; border-width:1pt; vertical-align:top; width:2.3in; padding:2.0pt 3.0pt 2.0pt 3.0pt\">" + claims.First(c => c.Type == "name").Value + "</td></tr><tr><td style=\"border-style:solid; border-color:#A3A3A3; border-width:1pt; vertical-align:top; width:2.3in; padding:2.0pt 3.0pt 2.0pt 3.0pt\"><b>Email</b></td><td style=\"border-style:solid; border-color:#A3A3A3; border-width:1pt; vertical-align:top; width:2.3in; padding:2.0pt 3.0pt 2.0pt 3.0pt\">" + claims.First(c => c.Type == "preferred_username").Value + "</td></tr><tr><td style=\"border-style:solid; border-color:#A3A3A3; border-width:1pt; vertical-align:top; width:2.3in; padding:2.0pt 3.0pt 2.0pt 3.0pt\"><b>Login Time</b></td><td style=\"border-style:solid; border-color:#A3A3A3; border-width:1pt; vertical-align:top; width:2.3in; padding:2.0pt 3.0pt 2.0pt 3.0pt\">" + DateTime.Now.ToString("dddd, dd MMMM yyyy h:mm tt") + "</td></tr></tbody></table>";
            string to = configuration.GetValue<string>("MailNotification:To"); //To address    
            string from = configuration.GetValue<string>("MailNotification:From"); //From address    
            MailMessage message = new MailMessage();
            message.From = new MailAddress(from);
            foreach (var address in to.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
            {
                message.To.Add(address);
            }

            string mailbody = configuration.GetValue<string>("MailNotification:body")+body;
            message.Subject = configuration.GetValue<string>("MailNotification:subject");
            message.Body = mailbody;
            message.BodyEncoding = Encoding.UTF8;
            message.IsBodyHtml = true;
            if (configuration.GetValue<string>("MailNotification:cc") != "")
                   {
                        message.CC.Add(configuration.GetValue<string>("MailNotification:cc"));
                   }
            SmtpClient client = new SmtpClient("smtp.office365.com", 587);  
            NetworkCredential basicCredential1 = new NetworkCredential(configuration.GetValue<string>("MailNotification:From"), configuration.GetValue<string>("emailcredentials"));
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = basicCredential1;
            try
            {
                client.Send(message);
                return true;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public bool sendDevEmail()
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            string body = "<br/><br/><table style=\"border-collapse:collapse; border-style:solid; border-color:#A3A3A3; border-width:1pt\"><tbody><tr><td style=\"border-style:solid; border-color:#A3A3A3; border-width:1pt; vertical-align:top; width:2.3in; padding:2.0pt 3.0pt 2.0pt 3.0pt\"><b>Name</b></td><td style=\"border-style:solid; border-color:#A3A3A3; border-width:1pt; vertical-align:top; width:2.3in; padding:2.0pt 3.0pt 2.0pt 3.0pt\">" + claims.First(c => c.Type == "name").Value + "</td></tr><tr><td style=\"border-style:solid; border-color:#A3A3A3; border-width:1pt; vertical-align:top; width:2.3in; padding:2.0pt 3.0pt 2.0pt 3.0pt\"><b>Email</b></td><td style=\"border-style:solid; border-color:#A3A3A3; border-width:1pt; vertical-align:top; width:2.3in; padding:2.0pt 3.0pt 2.0pt 3.0pt\">" + claims.First(c => c.Type == "preferred_username").Value + "</td></tr><tr><td style=\"border-style:solid; border-color:#A3A3A3; border-width:1pt; vertical-align:top; width:2.3in; padding:2.0pt 3.0pt 2.0pt 3.0pt\"><b>Login Time</b></td><td style=\"border-style:solid; border-color:#A3A3A3; border-width:1pt; vertical-align:top; width:2.3in; padding:2.0pt 3.0pt 2.0pt 3.0pt\">" + DateTime.Now.ToString("dddd, dd MMMM yyyy h:mm tt") + "</td></tr></tbody></table>";
            string to = configuration.GetValue<string>("MailNotification:To"); //To address    
            string from = configuration.GetValue<string>("MailNotification:From"); //From address    
            MailMessage message = new MailMessage();
            message.From = new MailAddress(from);
            foreach (var address in to.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
            {
                message.To.Add(address);
            }

            string mailbody = configuration.GetValue<string>("MailNotification:devbody") + body;
            message.Subject = configuration.GetValue<string>("MailNotification:devsubject");
            message.Body = mailbody;
            message.BodyEncoding = Encoding.UTF8;
            message.IsBodyHtml = true;
            if (configuration.GetValue<string>("MailNotification:cc") != "")
            {
                message.CC.Add(configuration.GetValue<string>("MailNotification:cc"));
            }
            SmtpClient client = new SmtpClient("smtp.office365.com", 587);
            NetworkCredential basicCredential1 = new NetworkCredential(configuration.GetValue<string>("MailNotification:From"), configuration.GetValue<string>("emailcredentials"));
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = basicCredential1;
            try
            {
                client.Send(message);
                return true;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

    }
}

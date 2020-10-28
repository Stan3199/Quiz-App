namespace TextAnalyticsPortal
{
    using TextAnalyticsPortal.Mail;

    public class DashboardOptions
    {
        public string BaseUrl { get; set; }

        public string DashboardAdmin { get; set; }

        public MailOptions Mail { get; set; }

        public bool ShowUnsubscribed { get; set; }
    }
}
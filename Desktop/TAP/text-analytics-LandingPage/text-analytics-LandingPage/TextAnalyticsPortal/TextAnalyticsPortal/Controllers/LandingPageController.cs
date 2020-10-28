using System.Linq;
using SaaSFulfillmentClient;
using SaaSFulfillmentClient.Models;

namespace TextAnalyticsPortal.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading;
    using System.Threading.Tasks;

    using TextAnalyticsPortal.Marketplace;
    using TextAnalyticsPortal.Models;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;

    [Authorize]
    public class LandingPageController : Controller
    {
        private readonly IFulfillmentClient fulfillmentClient;
        private readonly IMarketplaceNotificationHandler notificationHandler;
        private readonly ILogger<LandingPageController> logger;

        private readonly DashboardOptions options;

        private const string MailLinkControllerName = "MailLink";

        public LandingPageController(
            IOptionsMonitor<DashboardOptions> dashboardOptions,
            IFulfillmentClient fulfillmentClient,
            IMarketplaceNotificationHandler notificationHandler,
            ILogger<LandingPageController> logger)
        {
            this.fulfillmentClient = fulfillmentClient;
            this.notificationHandler = notificationHandler;
            this.logger = logger;
            this.options = dashboardOptions.CurrentValue;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Index(
            AzureSubscriptionProvisionModel provisionModel,
            CancellationToken cancellationToken)
        {
            var urlBase = $"{this.Request.Scheme}://{this.Request.Host}";
            this.options.BaseUrl = urlBase;
            var queryParams = new List<Tuple<string, string>>
                              {
                                  new Tuple<string, string>(
                                      "subscriptionId",
                                      provisionModel.SubscriptionId.ToString()),
                                  new Tuple<string, string>("planId", provisionModel.NewPlanId)
                              };

            if (provisionModel.SubscriptionStatus != StatusEnum.Subscribed)
            {

                //await this.notificationHandler.ProcessActivateAsync(provisionModel, cancellationToken);
                //Update
                string activateLink = this.BuildALink("Activate", queryParams);
                return this.Redirect(activateLink);
            }
            else
            {
                //await this.notificationHandler.ProcessChangePlanAsync(provisionModel, cancellationToken);

                string updateLink = this.BuildALink("Update", queryParams);
                return this.Redirect(updateLink);
            }


            try
            {
                await this.ProcessLandingPageAsync(provisionModel, cancellationToken);

                return this.RedirectToAction(nameof(this.Success));
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex);
            }
        }

        // GET: LandingPage
        public async Task<ActionResult> Index(string token, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(token))
            {
                this.ModelState.AddModelError(string.Empty, "Token URL parameter cannot be empty");
                return this.View();
            }

            var provisioningModel = await this.BuildLandingPageModel(token, cancellationToken);

            // If subscription status is subscribed, redirect user to Text Analytics Playground
            //if (provisioningModel.SubscriptionStatus == StatusEnum.Subscribed)
            //    return this.RedirectToTAP();
            //if (provisioningModel.SubscriptionStatus.ToString().ToLower() == "subscribed")
            //    return this.RedirectToTAP();

            if (provisioningModel != default)
            {
                provisioningModel.FullName = (this.User.Identity as ClaimsIdentity)?.FindFirst("name")?.Value;
                provisioningModel.Email = this.User.Identity.GetUserEmail();
                provisioningModel.BusinessUnitContactEmail = this.User.Identity.GetUserEmail();

                return this.View(provisioningModel);
            }

            this.ModelState.AddModelError(string.Empty, "Cannot resolve subscription");
            return this.View();
        }

        public ActionResult Success()
        {
            return this.View();
        }

        public ActionResult RedirectToTAP()
        {
            return Redirect("https://maqtextanalyticsdev.azurewebsites.net/");
        }

        private async Task<AzureSubscriptionProvisionModel> BuildLandingPageModel(
           string token,
           CancellationToken cancellationToken)
        {
            var requestId = Guid.NewGuid();
            var correlationId = Guid.NewGuid();

            var resolvedSubscription = await this.fulfillmentClient.ResolveSubscriptionAsync(
                                           token,
                                           requestId,
                                           correlationId,
                                           cancellationToken);

            if (resolvedSubscription == default(ResolvedSubscription)) return default;
            if (!resolvedSubscription.Success) return default;

            var existingSubscription = await this.fulfillmentClient.GetSubscriptionAsync(
                                           resolvedSubscription.SubscriptionId,
                                           requestId,
                                           correlationId,
                                           cancellationToken);

            var availablePlans = (await this.fulfillmentClient.GetSubscriptionPlansAsync(
                                      resolvedSubscription.SubscriptionId,
                                      requestId,
                                      correlationId,
                                      cancellationToken)).Plans.ToList();

            var provisioningModel = new AzureSubscriptionProvisionModel
            {
                PlanId = resolvedSubscription.PlanId,
                SubscriptionId = resolvedSubscription.SubscriptionId,
                OfferId = resolvedSubscription.OfferId,
                SubscriptionName = resolvedSubscription.SubscriptionName,
                PurchaserEmail = existingSubscription.Purchaser.EmailId,
                PurchaserTenantId = existingSubscription.Purchaser.TenantId,

                // Assuming this will be set to the value the customer already set when subscribing, if we are here after the initial subscription activation
                // Landing page is used both for initial provisioning and configuration of the subscription.
                //Region = TargetContosoRegionEnum.NorthAmerica,
                AvailablePlans = availablePlans,
                SubscriptionStatus = existingSubscription.SaasSubscriptionStatus,
                PendingOperations =
                                                (await this.fulfillmentClient.GetSubscriptionOperationsAsync(
                                                     resolvedSubscription.SubscriptionId,
                                                     requestId,
                                                     correlationId,
                                                     cancellationToken)).Any(
                                                    o => o.Status == OperationStatusEnum.InProgress)
            };

            return provisioningModel;
        }

        private string BuildALink(
            string controllerAction,
            IEnumerable<Tuple<string, string>> queryParams,
            string controllerName = MailLinkControllerName)
        {
            var uriStart = FluentUriBuilder.Start(this.options.BaseUrl.Trim()).AddPath(controllerName)
                .AddPath(controllerAction);

            foreach (var (item1, item2) in queryParams) uriStart.AddQuery(item1, item2);

            var href = uriStart.Uri.ToString();

            return href;
        }

        private async Task ProcessLandingPageAsync(
            AzureSubscriptionProvisionModel provisionModel,
            CancellationToken cancellationToken)
        {
            // A new subscription will have PendingFulfillmentStart as status
            if (provisionModel.SubscriptionStatus != StatusEnum.Subscribed)
            {

                await this.notificationHandler.ProcessActivateAsync(provisionModel, cancellationToken);
                //Update

            }
            else
            {
                await this.notificationHandler.ProcessChangePlanAsync(provisionModel, cancellationToken);
                //var queryParams = new List<Tuple<string, string>>
                //                  {
                //                      new Tuple<string, string>(
                //                          "subscriptionId",
                //                          provisionModel.SubscriptionId.ToString()),
                //                      new Tuple<string, string>("planId", provisionModel.NewPlanId)
                //                  };
                //string updateLink = this.BuildALink("Activate", queryParams);
                //await Redirect(updateLink);
            }
        }
    }
}

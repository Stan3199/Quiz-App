using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TextAnalyticsPortal.Controllers
{
    [AllowAnonymous]
    public class StaticController : Controller
    {
        [Route("Privacy")]
        public ActionResult Privacy()
        {
            return View();
        }

        [Route("Support")]
        public ActionResult Support()
        {
            return View();
        }
    }
}
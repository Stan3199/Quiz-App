using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using TextAnalyticsPortal.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System.IO;
using Newtonsoft.Json;

namespace TextAnalyticsPortal.Controllers
{

    public class FunctionAppController : Controller
    {
        private IConfiguration configuration;
        public FunctionAppController(IConfiguration iConfig)
        {
            configuration = iConfig;
        }
        public JObject getResponseFromEndpoint([FromBody] JObject requestjson)
        {
            WebRequest request;
            var result = "";
            if (requestjson["typeofdata"].Value<string>() == "Check User")
            {
                request = WebRequest.Create(configuration.GetValue<string>("CheckUser"));
            }
            else if (requestjson["typeofdata"].Value<string>() == "Events Data")
            {
                request = WebRequest.Create(configuration.GetValue<string>("EventsEndpoint"));
                //request = WebRequest.Create(configuration.GetValue<string>("SentimentAnalysis"));
            }
            else if (requestjson["typeofdata"].Value<string>() == "Other Data")
            {
                request = WebRequest.Create(configuration.GetValue<string>("OtherEndpoint"));
            }
            else if (requestjson["typeofdata"].Value<string>() == "Seeding Data")
            {
                request = WebRequest.Create(configuration.GetValue<string>("SeedingEndpoint"));
            }
            else if (requestjson["typeofdata"].Value<string>() == "Sentiment Data")
            {
                request = WebRequest.Create(configuration.GetValue<string>("SentimentAnalysis"));
            }
            else if (requestjson["typeofdata"].Value<string>() == "Developer Zone")
            {
                request = WebRequest.Create(configuration.GetValue<string>("DeveloperZone"));
            }
            else
            {
                request = WebRequest.Create(configuration.GetValue<string>("OtherEndpoint"));
            }
            request.Method = "POST";
            request.Timeout = 1200000;
            request.ContentType = "application/json";
            //request.Headers.Add("x-functions-key", configuration.GetValue<string>("KeyType") == "Dev" ? configuration.GetValue<string>("x-functions-key-dev") : configuration.GetValue<string>("KeyType") == "Prod" ? configuration.GetValue<string>("x-functions-key-prod") : "");
            if (requestjson["typeofdata"].Value<string>() == "Check User") request.Headers.Add("x-functions-key", "Tz76HWQ4kshpOvQnB9as1YuWF7RbQPaFHtEbFQ2qAaabv8DExv6n6g==");
            else if (requestjson["typeofdata"].Value<string>() == "Developer Zone") request.Headers.Add("Ocp-Apim-Subscription-Key", "5034038ea11d45dea6d6cd93a0bfae88");
            else request.Headers.Add("x-functions-key", configuration.GetValue<string>("KeyType") == "Dev" ? configuration.GetValue<string>("x-functions-key-dev") : configuration.GetValue<string>("KeyType") == "Prod" ? configuration.GetValue<string>("x-functions-key-prod") : "");
            using (var streamWriter = new StreamWriter(request.GetRequestStream()))
            {
                if (requestjson["typeofdata"].Value<String>() !="Sentiment Data") streamWriter.Write(JsonConvert.SerializeObject(requestjson["data"]).ToString());
                else streamWriter.Write(JsonConvert.SerializeObject(requestjson).ToString());
            }
            WebResponse httpResponse = request.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                result = streamReader.ReadToEnd();
                if (requestjson["typeofdata"].Value<String>() == "Sentiment Data") result = "{\"result\":" + result + "}";
            }

            JObject resultObject = JObject.Parse(result);
            return resultObject;
        }


    }
}
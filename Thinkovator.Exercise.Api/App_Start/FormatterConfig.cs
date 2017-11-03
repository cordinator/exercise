using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web.Http;

namespace Thinkovator.Exercise.Api
{
  public static class FormatterConfig
  {
    public static void Register(HttpConfiguration config)
    {
      // TODO(darends): Make this work with swagger?
      // var jsonFormatter = new JsonMediaTypeFormatter();
      // config.Services.Replace(typeof(IContentNegotiator), new JsonContentNegotiator(jsonFormatter));

      config.Formatters.Clear();
      config.Formatters.Add(new JsonMediaTypeFormatter());
      config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
      config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
    }
  }

  public class JsonContentNegotiator : IContentNegotiator
  {
    private readonly JsonMediaTypeFormatter _jsonFormatter;

    public JsonContentNegotiator(JsonMediaTypeFormatter formatter)
    {
      _jsonFormatter = formatter;
    }

    public ContentNegotiationResult Negotiate(Type type, HttpRequestMessage request, IEnumerable<MediaTypeFormatter> formatters)
    {
      var result = new ContentNegotiationResult(_jsonFormatter, new MediaTypeHeaderValue("application/json"));
      return result;
    }
  }
}
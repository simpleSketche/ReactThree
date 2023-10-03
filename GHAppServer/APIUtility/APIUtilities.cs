using Newtonsoft.Json;
using System.Text;

namespace GHAppServer
{
    public class APIUtilities
    {
        private static readonly APIUtilities _instance = new APIUtilities();
        public static APIUtilities Instance { get { return _instance; } }
        private APIUtilities() { }

        public async Task<ResponseObj> ApiRequestAsync(Uri route, RequestType requestType, object arg = null)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    if (requestType == RequestType.GET)
                    {
                        var request = new HttpRequestMessage()
                        {
                            RequestUri = route,
                            Method = HttpMethod.Get,
                        };

                        request.Headers.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                        HttpResponseMessage response = await client.GetAsync(route);
                    }

                    if (requestType == RequestType.POST)
                    {
                        var stringContent = new StringContent(JsonConvert.SerializeObject(arg), Encoding.UTF8, "application/json");
                        HttpResponseMessage response = await client.PostAsync(route, stringContent);
                        return new ResponseObj(response);
                    }

                    return null;
                }
            }
            catch(Exception e){
                throw e; 
            }

        }
    }
}

using Newtonsoft.Json;
using System.IO.Compression;
using System.Net;

namespace GHAppServer
{
    public class ResponseObj
    {
        public HttpResponseMessage Response { get; set; }

        public ResponseObj(HttpResponseMessage response)
        {

            Response = response;

        }

        private async Task<string> AsString()
        {

            string data = await this.Response.Content.ReadAsStringAsync();
            return data;

        }

        private async Task<Stream> AsStream()
        {

            var stream = await this.Response.Content.ReadAsStreamAsync();
            if (this.Response.Content.Headers.ContentEncoding.Contains("gizp"))
            {
                return Decompress(stream);
            }
            return stream;

        }

        private Stream Decompress(Stream data)
        {
            using (var zipStream = new GZipStream(data, CompressionMode.Decompress))
            {
                var resultStream = new MemoryStream();
                zipStream.CopyTo(resultStream);
                return resultStream;
            }
        }

        public async Task<Stream> TryParaseStream<TException>() where TException : Exception
        {
                return await this.AsStream();
        }

        public async Task<T> TryParseJson<T, TException>() where TException : Exception
        {
            try
            {
                string str = await this.AsString();
                if (typeof(T).Equals(typeof(string)))
                {
                    return (T)Convert.ChangeType(str, typeof(T));
                }
                else
                {
                    T apiResponse = JsonConvert.DeserializeObject<T>(str);
                    return apiResponse;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

    }
}

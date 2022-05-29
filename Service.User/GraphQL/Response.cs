namespace Service.User.GraphQL
{
    public class ResponseSingleContentModel<T>

    {
        public string? Message { get; set; }

        public int StatusCode { set; get; }

        public T Data { set; get; }
    }

    public class ResponseMultiContentModels<T>

    {
        public string? Message { get; set; }

        public int StatusCode { set; get; }

        public List<T> Data { set; get; }
    }
}

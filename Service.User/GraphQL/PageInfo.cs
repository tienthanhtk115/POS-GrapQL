namespace Service.User.GraphQL
{
	public class PageInfo<T>
	{
		public int pageCount { set; get; }
		public int pageSize { set; get; }
		public int totalCount { set; get; }
		public IList<T> listItem { set; get; }
	}
}

import { Component } from "react";

class Collection extends Component {
	constructor(props) {
		super(props);
		this.type = 'posts';
		this.state = {
			hasMore: 1,
			isLoadingMore: 0,
			page: 1,
			pages: [],
			error: false,
		};
	}
	componentDidMount() {
		this.loadNextPage();
	}
	// componentDidUpdate(oldProps) {

	// }
	loadNextPage() {
		// ensure there are more pages and that we are not already
		// loading the next page
		if (this.state.hasMore && !this.state.isLoadingMore) {
			if (!this.callApi) {
				return this.setState({ error: true });
			}
			// flag that we are loading
			this.setState({ isLoadingMore: 1 });
			// call the api
			this.callApi(this.state.page)
				.then((data) => {
					if (!data || !data[this.type]) {
						return this.setState({ error: true, isLoadingMore: 0 });
					}
					console.log('data.meta.total_entries', data.meta.total_entries, data.meta.per_page)
					this.setState({
						page: this.state.page + 1,
						isLoadingMore: 0,
						pages: [...this.state.pages, data],
						hasMore: data.meta.total_entries == data.meta.per_page,
					});
				})
				.catch((e) => {
					console.log("error", e);
					this.setState({ error: true, isLoadingMore: 0 });
				});
		}
	}
	render() {
		return null;
	}
}

export default Collection;

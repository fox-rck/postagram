/*
/ Rick Fox
/ 01-06-22
/ Feed view for showing all blogs
*/

import Collection from "../loaders/collection";
import List from '../components/list'

class FeedView extends Collection {
	constructor(props) {
		super(props);
		this.callApi = (page) => {
			return new Promise(async (resolve, reject)=>{
				console.log('Load api page from feed view', page)
				resolve()
			})
		}
	}
	render () {
		return (
			<List {...this.state} loadMore={this.loadNextPage} />
		)
	}
}

export default FeedView;
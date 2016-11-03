import React from 'react';
import ajax from 'superagent';


class Detail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: 'commits',
            commits: [],
            forks: []
        };

    }

    componentWillMount() {
        this.fetchFeed('commits');
        this.fetchFeed('forks');
        this.fetchFeed('pulls');
    }

    fetchFeed(type) {
        ajax.get(`https://api.github.com/repos/facebook/react/${type}`)
            .end((error, response) => {
                    if (!error && response) {
                        this.setState({ [type]: response.body });
                    } else {
                        console.log(`Error fetching ${type}`, error);
                    }
                }
            );
    }

    renderCommits() {

        return (<div>
            {this.state.commits.map((commit, index) => (

                <p key={index}>
                    <strong>{commit.author.login}</strong>:
                    <a href={commit.html_url}>{commit.commit.message}</a>
                </p>

            ))}
        </div>);
    }

    renderForks() {

        return (<div>
            {this.state.forks.map((fork, index) => (

                <p key={index}>
                    {fork.owner.login}
                </p>

            ))}
        </div>);
    }

    showCommits() {
        this.setState({ mode: 'commits' });
    }

    showForks() {
        this.setState({ mode: 'forks' });
    }

    render() {
        let content;

        if(this.state.mode == 'commits'){
            content = this.renderCommits();
        }else if(this.state.mode == 'forks'){
            content = this.renderForks();
        }

        return (<div>
            <button onClick={this.showCommits.bind(this)}> Show Commits </button>
            <button onClick={this.showForks.bind(this)}> Show Forks </button>
            {content}
            </div>);
    }
}

export default Detail;
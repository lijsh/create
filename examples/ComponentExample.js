
import { h, Component } from '../src'
/** @jsx h */
export const stories = [
  { name: "React", url: "https://zh-hans.reactjs.org/" },
  { name: "Vue.js", url: "https://cn.vuejs.org/" },
  { name: "Angular", url: "https://angular.io/" },
];

export class ComponentExample extends Component {
  render() {
    return (
      <div>
        <h3>Top Frameworks</h3>
        <ul>
          {this.props.stories.map(story => {
            return <Story name={story.name} url={story.url} />;
          })}
        </ul>
      </div>
    );
  }
}

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = { likes: Math.ceil(Math.random() * 100) };
  }
  like() {
    this.setState({
      likes: this.state.likes + 1
    });
  }
  render() {
    const { name, url } = this.props;
    const { likes } = this.state;
    return (
      <li>
        <button onClick={e => this.like()}>{likes}<b>❤️</b></button>
        <a href={url}>{name}</a>
      </li>
    );
  }
}
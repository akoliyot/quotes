import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import '../styles/app.scss';
import * as styles from './index.module.scss';

let classNames = require('classnames');

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuote: this.getRandomQuote()
    }
  }

  handleKeyPress = (e) => {
    console.log(e);

    switch (e.keyCode) {
      case 78: 
        console.log('Show next quote');
        this.setState({
          selectedQuote: this.getRandomQuote()
        });
        console.log(this.state.selectedQuote);
        break;

      case 80: 
        console.log('Show previous quote');
        break;

      default: 
        console.log('Unknown key pressed');
    }
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRandomQuote = () => {
    let allQuotes, randomIndex;

    allQuotes = this.props.data.allQuotesJson.edges;
    randomIndex = this.getRandomInt(allQuotes.length);
    return allQuotes[randomIndex].node;
  }

  componentDidMount = () => {
    console.log('componentDidMount');
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount = () => {
    console.log('componentWillUnmount');
    document.removeEventListener('keypress', this.handleKeyPress);
  }
  
  render() {
    return (
      <Layout>
        <div className={classNames(styles.contentBox, 'hidden')}>
          <article>
            <h1>{this.state.selectedQuote.text}</h1>
            <footer>
              {this.state.selectedQuote.author ? <p className={styles.author}>{this.state.selectedQuote.author}</p> : ''}
              {this.state.selectedQuote.source ? <p className={styles.source}>{this.state.selectedQuote.source}</p> : ''}
            </footer>
          </article>
        </div>
      </Layout>
    );
  }
}

export default IndexPage

export const query = graphql `
{
  allQuotesJson {
    edges {
      node {
        author
        text
        source
      }
    }
  }
}
`
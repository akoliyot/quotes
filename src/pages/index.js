import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import '../styles/app.scss';
import * as styles from './index.module.scss';

class IndexPage extends React.Component {
  render() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    let allQuotes, randomIndex, selectedQuote;

    allQuotes = this.props.data.allQuotesJson.edges;
    randomIndex = getRandomInt(allQuotes.length);
    selectedQuote = allQuotes[randomIndex].node;

    return (
      <Layout>
        <div className={styles.contentBox}>
          <article>
            <h1>{selectedQuote.text}</h1>
            <footer>
              {selectedQuote.author ? <p className={styles.author}>{selectedQuote.author}</p> : ''}
              {selectedQuote.source ? <p className={styles.source}>{selectedQuote.source}</p> : ''}
            </footer>
          </article>
        </div>
      </Layout>
    );
  }
}

// const IndexPage = ({data}) => {
//   let allQuotes, randomIndex, selectedQuote;

//   allQuotes = data.allQuotesJson.edges;
//   console.log(allQuotes);
  
//   randomIndex = getRandomInt(allQuotes.length);
//   selectedQuote = allQuotes[randomIndex].node;

//   function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
//   }

//   return (
//     <Layout>
//       <div className={styles.contentBox}>
//         <article>
//           <h1>{selectedQuote.text}</h1>
//           <footer>
//             <p className={styles.author}>{selectedQuote.author}</p>
//             <p className={styles.source}>{selectedQuote.source}</p>
//           </footer>
//         </article>
        

//       </div>
//     </Layout>
//   );
// }

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
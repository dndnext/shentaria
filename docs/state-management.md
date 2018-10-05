# State Management

For state management, we will use react [context](https://reactjs.org/docs/context.html) for simple state management, as we're unlikely to need the overhead of things like [redux](https://redux.js.org) or [mobx](https://mobx.js.org). It will use a context manager approach similar to below.

**contexts/example.js**

```js
import React from 'react';

export const ExampleContext = React.createContext({
  data: [],
  getData: () => {}
});

export const ExampleProvider = ExampleContext.Provider;
export const ExampleConsumer = ExampleContext.Consumer;

```

**managers/example.js**

```js
import React from 'react';
import {ExampleProvider} from '../contexts/example';

export default class ExampleManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      getData: this.getData
    };
  }

  async getData(url) {
    const res = fetch(url);
    const json = await res.json();
    this.setState({ data: json });
  }

  render() {
    return (
      <ExampleProvider value={this.state}>
        {this.props.children}
      </ExampleProvider>
    );
  }
}

```

**example/usage.js**

```js
import React from 'react';
import ExampleManager from '../manager/example';
import {ExampleConsumer} from '../contexts/example';

// Usually you'd define the manager higher up, such as on the page level

export default () => (
  <ExampleManager>
    <ExampleConsumer>
      {({data, getData}) => (
        <div>
          {data.map(({ name }, i) => (
            <div key={i}>{name}</div>
          ))}
          <button onClick={() => getData('http://test.com')}>Load Data</button>
        </div>
      )}
    </ExampleConsumer>
  </ExampleManager>
)
```

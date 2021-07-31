import React from "react";
import Tables from "./table";
import WrappedForm from './CheckOut';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";





function App() {
  
  
  return (
    <Router>
      <Route path="/" exact component={Tables} />
      <Route path='/checkout/:id' render={(props) => <WrappedForm {...props}/>}/>
    </Router>
  );
}

export default App;

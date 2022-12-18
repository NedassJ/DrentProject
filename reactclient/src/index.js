import {render} from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Header.css'
import './index.css';

import CreateItem from './CreateItem'
import EditItem from './EditItem'
import Warehouses from './Warehouses'
import Protected from './Protected'
import NotFound from './NotFound'
import CreateWarehouse from './CreateWarehouse';
import EditWarehouse from './EditWarehouse';
import Items from './Items';
import SelectWarehouse from './SelectWarehouse';
import Comments from './Comments';
import CreateComment from './CreateComment'
import EditComment from './EditComment'


render(
  <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/404" element={<NotFound />} />

        <Route path="/selectwarehouse" element={<SelectWarehouse />} />
        <Route path="/items/:id" element={<Items />} />
        <Route path="/createitem/:id" element={<Protected cmp={CreateItem} role={"Admin"}/>} />
        <Route path="/edititem/:id/:cid" element={<Protected cmp={EditItem} role={"Admin"}/>} />

        <Route path="/comments/:id/:id2" element={<Comments />} />
        <Route path="/createcomment/:id/:id2" element={<Protected cmp={CreateComment} role={"SystemUser"}/>} />
        <Route path="/editcomment/:id/:id1/:id2" element={<Protected cmp={EditComment} role={"SystemUser"}/>} />

        <Route path="/warehouses" element={<Protected cmp={Warehouses} role={"Admin"}/>} />
        <Route path="/createwarehouse" element={<Protected cmp={CreateWarehouse} role={"Admin"}/>} />
        <Route path="/editwarehouse/:id" element={<Protected cmp={EditWarehouse} role={"Admin"}/>} />
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

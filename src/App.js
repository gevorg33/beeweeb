import React, {useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import './App.css';

import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sing-in-and-sign-up/sign-in-and-sign-up.component";
import { Dashboard } from "./pages/dashboard/dashboard.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from './redux/user/user.actions';


export const App = () => {

    const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {

      auth.onAuthStateChanged(async userAuth => {

        if (userAuth) {

          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            dispatch(setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            }));
          });

        }

        dispatch(setCurrentUser());

      })},[]);

  return (
      <div>
        <Header/>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/dashboard' render={() => currentUser ? (<Dashboard/>) : (<Redirect to='/signin' />)}/>
          <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/dashboard' />) : (<SignInAndSignUpPage/>)}/>
        </Switch>
      </div>
  )
}
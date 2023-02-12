import React from 'react';
import {Route, Switch, useLocation} from "react-router-dom";
import Main from "../../pages/main/main";
import Works from "../../pages/works/works";
import {ILocationState} from "../../interfaces/interfaces";
import BigImageModal from "../modal/big-image/big-image";
import Order from "../../pages/order/order";
import Login from "../../pages/login/login";
import { ProtectedRouteUser } from '../protected-route/protected-route-user';
import Profile from '../../pages/profile/profile';
import {ProtectedRouteGuest} from "../protected-route/protected-route-guest";
import ProfileAddStaffModal from "../modal/profile-add-staff/profile-add-staff";

const Routes = () => {
    let location = useLocation() as ILocationState;
    const background = location.state && location.state.background;

    return (
        <div>
            <Switch location={background || location}>
                <Route path="/" exact>
                    <Main />
                </Route>
                <Route path="/works">
                    <Works />
                </Route>
                <Route path="/order">
                    <Order />
                </Route>
                <ProtectedRouteGuest path="/profile/staffs">
                    <Profile/>
                </ProtectedRouteGuest>
                <ProtectedRouteUser exact path="/login">
                    <Login/>
                </ProtectedRouteUser>
            </Switch>
            {background &&
                <Switch>
                    <Route exact path="/works/:id">
                        <BigImageModal />
                    </Route>
                </Switch>
            }
        </div>

    );
};

export default Routes;
import React from 'react';
import {Route, Switch, useLocation} from "react-router-dom";
import {ILocationState} from "../../interfaces/interfaces";

import ProfileStaff from "../profile-entities/profile-staff/profile-staff";
import ProfileAddStaffModal from "../modal/profile-add-staff/profile-add-staff";
import ProfileServices from "../profile-entities/profile-services/profile-services";

const ProfileRoutes = () => {
    let location = useLocation() as ILocationState;
    const background = location.state && location.state.background;

    return (
        <div>
            <Switch>
                <Route path="/profile/staffs">
                    <ProfileStaff />
                </Route>
                <Route path="/profile/services">
                    <ProfileServices />
                </Route>
            </Switch>
            {background &&
                <Switch>
                    <Route exact path="/profile/staffs/add">
                        <ProfileAddStaffModal />
                    </Route>
                    <Route exact path="/profile/staffs/:id">
                        <ProfileAddStaffModal />
                    </Route>
                </Switch>
            }
        </div>

    );
};

export default ProfileRoutes;
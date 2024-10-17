import { AddExpenceComponent } from "../component/manage-expence/add-expence/add-expence.component";
import { ViewExpenceComponent } from "../component/manage-expence/view-expence/view-expence.component";
import { AddPlayerComponent } from "../component/manage-player/add-player/add-player.component";
import { ViewPlayerComponent } from "../component/manage-player/view-player/view-player.component";
import { AddPlaygroundComponent } from "../component/manage-playground/add-playground/add-playground.component";
import { ViewPlaygroundComponent } from "../component/manage-playground/view-playground/view-playground.component";
import { AddTeamComponent } from "../component/manage-team/add-team/add-team.component";
import { ViewTeamComponent } from "../component/manage-team/view-team/view-team.component";
import { AddUserComponent } from "../component/manage-user/add-user/add-user.component";
import { ViewUserComponent } from "../component/manage-user/view-user/view-user.component";
import { ExpenseResolver } from "../resolver/expensse.resolver";

// Application Routes of front end ===================
export const APPLICATION_ROUTES = {

    // addExpence: {
    //     path: 'addExpence',
    //     component: AddExpenceComponent,
    //     // resolve:{
    //     //     expence:ExpenseResolver
    //     // }
    // },
    // viewExpence: {
    //     path: 'viewExpence',
    //     component: ViewExpenceComponent,
    //     // resolve:{
    //     //     expence:ExpenseResolver
    //     // }
    // },
    addUser: {
        path: 'addUser',
        component: AddUserComponent,
        // resolve:{
        //     expence:ExpenseResolver
        // }
    },
    viewUser: {
        path: 'viewUser',
        component: ViewUserComponent,
        // resolve:{
        //     expence:ExpenseResolver
        // }
    }, addplayer: {
        path: 'addplayer',
        component: AddPlayerComponent,
        // resolve:{
        //     expence:ExpenseResolver
        // }
    },
    viewplayer: {
        path: 'viewplayer',
        component: ViewPlayerComponent,
        // resolve:{
        //     expence:ExpenseResolver
        // }
    }, addPlayGround: {
        path: 'addPlayGround',
        component: AddPlaygroundComponent,
        // resolve:{
        //     expence:ExpenseResolver
        // }
    },
    viewPlayGround: {
        path: 'viewExpence',
        component: ViewPlaygroundComponent,
        // resolve:{
        //     expence:ExpenseResolver
        // }
    }, addTeams: {
        path: 'addteams',
        component: AddTeamComponent,
        // resolve:{
        //     expence:ExpenseResolver
        // }
    },
    viewTeams: {
        path: 'viewTeams',
        component: ViewTeamComponent,
        // resolve:{
        //     expence:ExpenseResolver
        // }
    }
}
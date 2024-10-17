import { INavData } from '@coreui/angular';
import { APPLICATION_ROUTES } from 'src/app/utils/app.routes';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Manage User',
    url: APPLICATION_ROUTES.addUser.path,
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Manage Players',
    url: APPLICATION_ROUTES.addplayer.path,
    iconComponent: { name: 'cil-group' }
  }
  ,
  {
    name: 'Manage PlayGround',
    url: APPLICATION_ROUTES.addPlayGround.path,
    iconComponent: { name: 'cil-drop' }
  }
  ,
  {
    name: 'Manage Teams',
    url: APPLICATION_ROUTES.addTeams.path,
    iconComponent: { name: 'cil-library-building' }
  }

]

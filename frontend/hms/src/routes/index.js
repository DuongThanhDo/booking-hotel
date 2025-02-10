import { configs } from '../configs';
import { Booking, Customer, Home, Login, Room, Setting, Staff, Statistical, Support } from '../pages';

const adminRoutes = [
    { path: configs.routes.home, component: Home },
    { path: configs.routes.booking, component: Booking },
    { path: configs.routes.customer, component: Customer },
    { path: configs.routes.room, component: Room },
    { path: configs.routes.setting, component: Setting },
    { path: configs.routes.staff, component: Staff },
    { path: configs.routes.statistical, component: Statistical },
    { path: configs.routes.support, component: Support },
    { path: configs.routes.login, component: Login, layout: null },
];

const staffRoutes = [
    { path: configs.routes.home, component: Home },
    { path: configs.routes.booking, component: Booking },
    { path: configs.routes.setting, component: Setting },
    { path: configs.routes.support, component: Support },
    { path: configs.routes.login, component: Login, layout: null },
];

const publicRoutes = [
    { path: configs.routes.login, component: Login, layout: null },
];

export { adminRoutes, staffRoutes, publicRoutes };

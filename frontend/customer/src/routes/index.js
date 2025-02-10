import { configs } from '../configs';
import { AboutUs, Amenities, BookingForm, Cart, Contact, HomePage, Login, Register, Rooms } from '../pages';

const publicRoutes = [
    { path: configs.routes.home, component: HomePage, layout: null },
    { path: configs.routes.rooms, component: Rooms },
    { path: configs.routes.amenities, component: Amenities },
    { path: configs.routes.aboutUs, component: AboutUs },
    { path: configs.routes.contact, component: Contact },
    { path: configs.routes.login, component: Login, layout: null },
    { path: configs.routes.register, component: Register, layout: null },
    { path: configs.routes.cart, component: Cart },
    { path: configs.routes.bookingForm, component: BookingForm },
];

export { publicRoutes };

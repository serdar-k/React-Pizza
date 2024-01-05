import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

// ROUTER İÇİN YENİ BİR YAZIM ŞEKLİ
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // NESTED PATH'LER İÇERİSİNDE MEYDANA GELEN BİR HATA DURUMU, EĞER İLGİLİ PATH İÇERİSİNDE ELE ALINMAMIŞSA PARENT PATH'E İLETİLİR, BU NEDENLE ERROR SAYFASI BURADA BELİRTİLDİ, AŞAĞIDA MENU İÇERİSİNDE OLUŞABİLECEK ERROR KENDİ PATH'İ İÇERİSİNDE ELE ALINDI
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        // REACT ROUTER LOADER - MENU SAYFASINA GİDİLDİĞİNDE API'DAN VERİ ÇEKEBİLİR
        // 1.ADIM => HANGİ COMPONENTTE HANGİ API'DA HANGİ VERİ ÇEKİLECEKSE, O KOMPONENT İÇERİSİNE İLGİLİ FONKSİYON YAZILIR
        // 2.ADIM => İLGİLİ FONKSİYON BURAYA IMPORT EDİLİR VE LOADER ÖZELLİĞİNE KARŞILIK GELEN DEĞER OLARAK ATANIR
        // 3.ADIM => İLGİLİ KOMPONENT İÇERİSİNDEN USELOADERDATA HOOK'U İLE VERİ ALINIR
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

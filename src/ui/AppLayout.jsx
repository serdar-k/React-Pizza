import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";

import Loader from "../ui/Loader";

function AppLayout() {
  // USENAVIGATION HOOK'U REACT ROUTER İÇERİSİNDEDİR VE SAYFANIN YÜKLENMESİ İLE İLGİLİ BİLGİLERİ İÇERİR - USENAVIGATE İLE AYNI HOOK DEĞİLDİR!
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;

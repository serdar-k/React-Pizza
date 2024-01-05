import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const userName = useSelector((store) => store.user.username);
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();

  return (
    <div>
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* FORM YAPISI REACT ROUTER'DAN ALINDI, ACTION DEĞERİ VERİLSE DE AYNI İŞLEVİ GÖRECEKTİR */}
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={userName}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-sm bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 font-medium accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
        {/* FORM VERİLERİ İLE BERABER KART İÇERİSİNDEKİ BİLGİLER(SİPARİŞ BİLGİLERİ) DE GÖNDERİLİR, BURADA KART BİR ARRAY OLDUĞUNDAN ÖNCE STRING TİPİNE DÖNÜŞTÜRÜLDÜ*/}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
      </Form>
    </div>
  );
}

// YUKARIDAKİ FORM SUBMIT EDİLDİĞİNDE, REACT ROUTER BURADA TANIMLANAN ACTION FONKSIYONUNU DEVREYE SOKACAKTIR
export async function action({ request }) {
  // FORMDATA, BİR WEB API'DİR VE BROWSER TARAFINDAN SAĞLANIR
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);

  //  KART İÇERİSİNDEKİ BİLGİLER TEKRAR PARSE EDİLEREK ESKİ HALİNE GETİRİLDİ
  // PRIORITY BİLGİSİDE TRUE YA DA FALSE OLACAK ŞEKİLDE DÜZELTİLDİ
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give a correct phone number!";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // SİPARİŞ TAMAMLANDIKTAN SONRA YÖNLENDİRME YAPMAK İÇİN USENAVIGATE HOOK'U BURADA KULLANILAMAZ, BUNUN YERİNE REDIRECT FONKSİYONU KULLANILABİLİR
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

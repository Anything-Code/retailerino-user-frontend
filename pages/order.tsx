import React, { useContext, useState } from "react";
import { InputField } from "../component/fields/InputField";
import { gql, useMutation, useQuery } from "@apollo/client";
import { graphqlClient } from "./_app";
import { StoreContext } from "../pages/_app";
import { useRouter } from "next/router";

const PLACE_ORDER = gql`
  mutation placeOrder(
    $email: String!
    $firstname: String!
    $lastname: String!
    $password: String!
    $phoneNumber: String!
    $street: String!
    $zip: String!
    $city: String!
    $country: String!
    $orderItems: [Int]!
    $deliveryServiceProvicerId: Int!
  ) {
    placeOrderUnauthenticated(
      user: {
        email: $email
        firstname: $firstname
        lastname: $lastname
        password: $password
        phoneNumber: $phoneNumber
      }
      address: { street: $street, zip: $zip, city: $city, country: $country }
      orderItems: $orderItems
      deliveryServiceProvicerId: $deliveryServiceProvicerId
    ) {
      id
      confirmed
      user {
        cuid
        firstname
      }
    }
  }
`;

export default () => {
  const router = useRouter();
  const storeContext = useContext(StoreContext);
  if (storeContext == null) return null;
  const { cart, emptyCart } = storeContext;

  const [placeOrder, { data, loading, error }] = useMutation(PLACE_ORDER);
  const doPlaceOrder = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const yo = await placeOrder({
        variables: {
          firstname: user.firstname,
          lastname: user.lastname,
          phoneNumber: user.phonenumber,
          email: user.email,
          password: user.password,
          street: address.street,
          zip: address.zip,
          city: address.city,
          country: address.country,
          orderItems: cart.map((item: any) => item.id),
          deliveryServiceProvicerId: 1,
        },
      });
      router.push('orderconfirmed');
      emptyCart();
    } catch (error) {}
  };
  const [user, setUser] = useState({
    firstname: "Niklas",
    lastname: "Lübcke",
    phonenumber: "012345958686",
    email: "test@test.de",
    password: "test123",
    matchPassword: "test123",
  });
  const [address, setAddress] = useState({
    street: "Alfred Street",
    zip: "69123",
    city: "Heidelberg",
    country: "Gurmany",
  });
  return (
    <div className="box-center" style={{ width: "300px" }}>
      <form>
        <input
          value={user.firstname}
          placeholder="FirstName"
          className="w-100"
          type="text"
          onChange={(ev) => {
            ev.preventDefault();
            setUser((oUser) => ({ ...oUser, firstname: ev.target.value }));
          }}
        />
        <input
          value={user.lastname}
          placeholder="LastName"
          className="w-100"
          type="text"
          onChange={(ev) => {
            ev.preventDefault();
            setUser((oUser) => ({ ...oUser, lastname: ev.target.value }));
          }}
        />
        <input
          value={user.phonenumber}
          placeholder="PhoneNumber"
          className="w-100"
          type="text"
          onChange={(ev) => {
            ev.preventDefault();
            setUser((oUser) => ({ ...oUser, phonenumber: ev.target.value }));
          }}
        />
        <input
          value={user.email}
          placeholder="Email"
          className="w-100"
          type="text"
          onChange={(ev) => {
            ev.preventDefault();
            setUser((oUser) => ({ ...oUser, email: ev.target.value }));
          }}
        />
        <input
          value={user.password}
          placeholder="Password"
          className="w-100"
          type="password"
          onChange={(ev) => {
            ev.preventDefault();
            setUser((oUser) => ({ ...oUser, password: ev.target.value }));
          }}
        />
        <input
          value={user.matchPassword}
          placeholder="Re-enter Password"
          className="w-100"
          type="password"
          onChange={(ev) => {
            ev.preventDefault();
            setUser((oUser) => ({ ...oUser, matchPassword: ev.target.value }));
          }}
        />
        <input
          value={address.street}
          placeholder="Street"
          className="w-100"
          type="text"
          onChange={(ev) => {
            ev.preventDefault();
            setAddress((oAddress) => ({
              ...oAddress,
              street: ev.target.value,
            }));
          }}
        />
        <input
          value={address.street}
          placeholder="Zip"
          className="w-100"
          type="text"
          onChange={(ev) => {
            ev.preventDefault();
            setAddress((oAddress) => ({
              ...oAddress,
              street: ev.target.value,
            }));
          }}
        />
        <input
          value={address.city}
          placeholder="City"
          className="w-100"
          type="text"
          onChange={(ev) => {
            ev.preventDefault();
            setAddress((oAddress) => ({
              ...oAddress,
              city: ev.target.value,
            }));
          }}
        />
        <input
          value={address.country}
          placeholder="Country"
          className="w-100"
          type="text"
          onChange={(ev) => {
            ev.preventDefault();
            setAddress((oAddress) => ({
              ...oAddress,
              country: ev.target.value,
            }));
          }}
        />
        <button
          className="w-100"
          type="submit"
          onClick={(e) => doPlaceOrder(e)}
        >
          Buy now!
        </button>
        <div>{error && "Something wrong m8."}</div>
      </form>
    </div>
  );
};

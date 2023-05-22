import {createContext, useContext} from "react";

const defaultBackendUrlValue = process.env.REACT_APP_API

const backendUrlContext = createContext(defaultBackendUrlValue);

export const BackendUrlProvider = backendUrlContext.Provider;
export const BackendUrlConsumer = backendUrlContext.Consumer;

export const useBackendUrl = () => useContext(backendUrlContext);
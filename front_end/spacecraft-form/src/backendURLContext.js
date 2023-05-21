import {createContext, useContext} from "react";

const defaultBackendUrlValue = "http://localhost:8000/spacecrafts";

const backendUrlContext = createContext(defaultBackendUrlValue);

export const BackendUrlProvider = backendUrlContext.Provider;
export const BackendUrlConsumer = backendUrlContext.Consumer;

export const useBackendUrl = () => useContext(backendUrlContext);
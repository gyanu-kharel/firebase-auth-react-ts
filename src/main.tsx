import React from 'react'
import ReactDOM from 'react-dom/client'
import {ChakraProvider} from "@chakra-ui/react";
import {router} from "./routes/router.tsx";
import {RouterProvider} from "react-router-dom";
import AppUserProvider from './providers/AppUserProvider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppUserProvider>
        <RouterProvider router={router} />
      </AppUserProvider>
    </ChakraProvider>
  </React.StrictMode>
)

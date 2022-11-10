## intalacion de React-Route-Dom

```
npm install react-router-dom@6
```

## carpeta Layout

En la carpeta layout se colocan las estructuras cascarones de nuestras paginas es decir que tendran tal aspecto, este color etc..

## Material ui

Para instalar Material UI debemos de tener instalado primero react y react-dom en las documentaciones cuando diga peer dependecy es por que hay unos requisitos necesarios antes de instalar el paquete.

> Para que material UI tome la tipografia y este configurado correctamente debemos proprocionar un theme de la siguiente manera.

este es el componente que va a proveer el theme esta es una forma mas organizada el crear un higher-order-component y proveer a los hijos el theme.

```jsx
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { purpleTheme } from "./purpleTheme";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
```

Este es un archivo para crear el provider que proveera el theme

```js
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: "#262254",
    },
    secondary: {
      main: "#543884",
    },
    error: {
      main: red.A400,
    },
  },
});
```

Ya solo hay que colocar el provider donde queremos proveer el theme.

```jsx
import { AppRoute } from "./router/AppRoute";
import { AppTheme } from "./theme";

export const JournalApp = () => {
  return (
    <AppTheme>
      <AppRoute />
    </AppTheme>
  );
};
```

Esta es la forma en la que podemos usar los elementos en Material UI por default si no le pasamos props se genera un elemento p.

```jsx
import { Typography } from "@mui/material";

export const JournalPage = () => {
  return <Typography>JournalPage</Typography>;
};
```

Si queremos que sea otro elemento o componente se lo expecificamos con la prop component. Esto no es que cambie de tamaño

```jsx
import { Typography } from "@mui/material";

export const JournalPage = () => {
  return <Typography component="h1">JournalPage</Typography>;
};
```

Si quiero que el elemento tenga en theme que material UI le coloca a los h1 solo debemos de colocarselo con una prop llamada variant.

```jsx
import { Typography } from "@mui/material";

export const JournalPage = () => {
  return <Typography variant="h1">JournalPage</Typography>;
};
```

Si queremos uutilizar iconos lo hacemos de la siguiente manera.

```jsx
import { EmailOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";

export const JournalPage = () => {
  return (
    <>
      <Typography variant="h1">JournalPage</Typography>
      <EmailOutlined />
    </>
  );
};
```

> Algo importante al usar las importaciones de iconos el posible que la carga de la pagina se vea afectada para eso Material UI tiene algunas sugerencias para solucionar ese problema.

Se dice que las **import named** son mas lentas que las **import default**

Aqui podemos leer mas sobre el tema: [Minimizing-bundle-size](https://mui.com/material-ui/guides/minimizing-bundle-size/#development-environment)

## Layout

La carpeta llamada layout nos servira para crear nuestros componentes mas centralizado, donde tendremos esos componentes que son iguales pero solo algunas cosas cambian esta forma nos ayuda a no duplicar codigo.

El contenido que contendran esos componentes del layout son parter del componente completo que sabemos que reutilizaremos.

### Diferencia entre Views y Pages

Las Pages cubre todo el punto de vista de la pantalla del usuario.

Los Views es unas parte de un pages que pueden ser varios views y que sean mostrardos dependiendo algunas condicion.

## Configuracion de Firebase

1. Primero debemos ir a la consola(Go to console) de firebase que se encuentra en la parte superior derecha.
2. Luego debemos de hacer click en crear un proyecto(Create a project).
3. Luego de acertar terminos y dar a continuar saldra si quieres configurar y usar el google Analytics es nos ayuda a monitoriar las peticiones y registros de nuestra app como de donde se hizo la peticion.
4. Luego dar a continuar y esperamos a que se cree el proyecto
5. Luego damos click a continue y nos debe llevar a la pargina principal de configuracion de nuestra app
6. Debemos de dar click en el icono que identifica a la web.
7. nos pedira que le demos un sobrenombre de la app que seria de la app en este caso la app de react notesAPP
8. Tambien nos da la eleccion de seleccionar si queremos hostiar nuestra app con firebase.
9. luego le damos a registrar app
10. Luego de esto me dara la informacion que necesito para el frontend, lo que nos da es publico
11. y tambien nos indica que hagamos la inatalacion de firebase para hacer uso de eso servicio.
12. La parte del codigo es como le diremos a nuestra app como vamos a usa firebase o que esta es la configuracion del cliente de firebase
13. hay una parte que son las variables de entorno las cuales podriamos evitar mandarla a un repo publico para mas privacidad. Algo que debemos de tener en cuenta es que esto esas configuraciones y variables de entorno son solo para conectarnos no es para administrarlo.
14. Ya lo que debemos de hacer es crear una carpeta llamada `firebase` con un archivo de configuracion `config.js`

> Cloud firestore es una base de dato no relacional (noSQL)

Para iniciar a utilizar la auth de parte de firebase damos clic en Authentication y nos pedira que seleccionemos los provedores que voy a utilizar en mi app como google, github. etc. solo tenemos que habilitarlos.

Si queremos saber mas podemos buscar en la documentacion [docs](https://firebase.google.com/docs/auth/web/google-signin) y si queremos buscar algo mas podemos usar el buscador.

## Checking authentification

En esta app creamos un componente en este caso en el modulo UI ya que este componente nos es dependiente de algun modulo es global. este componente ejecutara un loading indicando que esta en checking para saber si esta autentificado o no.

Nosotros anteriormente teniamos el estado inicial del store de redux de nuestra app en not-authentificated debemos de colocarlo en checking ya que no sabemos si esta no autentificado.

```jsx
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/slices/auth";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    //* Esta es una funcion que nos proporciona firebase para mantener

    //* Esta funcion nos regresa unj observable es decir es algo que esta emitiendo valores, es decir que cuando el estado de la auth cambia se va a disparar, en teoria cuando tenemos un observable que  hace muchas emisiones idealmente vamos a querer limpiarla. pero en este caso no quiero limpiarla porque siempre quiero estas atento a los cambios del estado de mi autentificacion

    //* Esta funcion recibe al auth que creamos como primer argumento y como segundo una funcion(callback) que quiero que se ejecute cuando reciba el siguiente valor y es una funcion async y contiene un valor de tipo User
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });
  }, []);

  //* Si solo retornamos una unica variable podemos mandarla de esta manera y no hay que desestructurarla
  return status;
};
```

## LogOut firebase

la configuracion de auth de firebase nos porporciona un metodo `signOut` para cerra sesion de cualquier provedor que estemos autenticado en el momento.

> Nosotros podemos utilizar otros servicios que nos permitan la autentificacion como es [auth0](https://auth0.com/) entre otros mas.

## Configurando FireStore DataBase

vamos al apartado de FireStore DataBase y si estamos iniciando un proyecto nuevo nos saldra create a data base y damos click hay luego nos dira que seleccionemos `modo de produccion` o `modo de prueba` el modo de produccion nos indica **allow read, write: if false;** es decir que solo podemos leer o escribir si la condicion es falsa. El modo de prueba nos indica **allow read, write: if request.time < timestamp.date(2022, 11, 24);** es decir que solo podemos leer y escribir en sierto momentos en el tiempo. **Pero la idea es que podamos leer y editar si estamos autenticados**

> ya que podemos saber si estamos autenticados podemos elegir el modo de produccion.

> FireStore tiene un apartado en la cual le podemos aplicar reglas a la forma en que guerdaremos los datos y otras cosas mas.

Debemos de tener en cuenta en las reglas de fireStore de que solo podemos manipular y obtener los datos si estamos autentificado

esta es como viene en modo de produccion por default:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Nosotros debemos de indicarle que solo si estoy autenticado me permita modificar y obtener datos, eso lopodemos hacer de la siguente manera:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Nosotros con la rules podemos idicar muschas cosas que se permitan o no dependiendo alguna condicion.

# cargar los datos al recargar la pagina

> Algo que tambien se hacer para no usar los thunks es tener aparte las peticiones y luego hacer la insercion al store de redux

Este es un helper global que creamos para hacer las peticiones a fireStores de los docs de la collection

```js
import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = "") => {
  if (!uid) throw new Error("El Uid no existe");

  // tenemos que hacer la referencia donde esta los docs que necesitamos en fireStore
  const collectionRef = collection(FirebaseDB, `${uid}/noteColletions/notes`);

  // Luego debemos de usar le metodo getDocs que recibe como argumentos las referencias que creamos y stambien podemos agregarle los filtros.
  const docs = await getDocs(collectionRef);

  const notes = [];

  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });

  return notes;
};
```

## configurar cloudinary para almacenar imagenes

vamos a las configuraciones y vamos a **upload**, luego bajamos al apartado de **Upload presets** y damos click en **Add upload preset** para crear un punto de acceso y le colocamos el nombre que queramos para identificarla y los colocamos
**Unsigned** esto es para que cualquiera con acceso a nuestra api pueda subir imagenes si colocamos la otra opcion esta solo se podra con el token. Tambien podemos agragar un directorio para que ckuando alguien suba una imagen se guarde en esa carpeta expecificada.

Ahora en la documentacion podemos ver como hacer ese **post** de las imagenes [Docs](https://cloudinary.com/documentation/image_upload_api_reference)

Esta es la ruta a la que debemos de hacer el **POST**:

El Demo debemos de colocal el cloud name que nos proporciona cloudinary que lo podemos ver en el dashboard
Y luego indica los que haremos

```
https://api.cloudinary.com/v1_1/demo/upload
```

Como estamos **Unsigned** no es necesario mandar la api key

Ahora en el body lo que vamos a mandar es el archivo este lleva la key **file** que es de tipo file y el archivo a subir
Y otra cosa que debemos de proporcionar en el body es el **upload_preset** y este tiene como valor el nombre que le colocamos al agragar el preset.

# Eliminacion de fotos en cloudinary

> Algo que de considera que no seria recomendable es ejecutar el eliminado de las fotos de la nota eliminada en este caso es que no sea en el frontEnd esto no seria algo seguro esponer las eliminaciones desde el frontend, lo recomendado es ejecutar esa accion desde el backEnd

En esta son las docs para realizar las eliminaciones del lado del backend con node:

- [delete](https://cloudinary.com/documentation/admin_api#delete_resources)
- [install](https://cloudinary.com/documentation/node_integration)

Primero se usar el sdk de cloudinary debemos de configurarlo indicandole el dashboard nuestro:

```js
import { v2 as cloudinary } from "cloudinary";

// estos datos los encontramos en el home de nuestro perfil de cloudinary

// Debemos de configurar cloudinary para que sepa cual en mi dashboard administrativo
cloudinary.config({
  cloud_name: "dsp0v740w",
  api_key: "382117299752229",
  api_secret: "yC96IgHQWyEu7RE3v_A2MxYjsj8",
  secure: true,
});
```

> Algo que debemos de hacer para que el error de "setImmediate is not defined" es instalar un paquete como dependecia de desarrollo `npm i -D setimmediate`. Luego de instalarlo debemos de proporcionarlo en la parte del testing llendo a `jest.setup.js` y importar el paquete.
>
> **jest.config.js**
>
> ```js
> import "setimmediate";
> ```

Eliminando los archivos mediante si id:

> Debemos de tener en cuenta que si expesificamos una carpeta tambien debemos de especificarla con el id Ej: notes-app/ID
> Tambien podemos especificar el tipo de recurso a eliminar con resource_type.

```js
// ahora vamos a eliminar la imagen subida

const deleteResp = await cloudinary.api.delete_resources([id, id, id], {
  resource_type: "image",
});
```

## Test con jest en redux

[Writing-tests](https://redux.js.org/usage/writing-tests)

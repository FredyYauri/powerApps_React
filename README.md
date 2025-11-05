# Packaging

- Crear carpeta para build
```sh
mkdir solution
```

- Accedemos a la carpeta creada
```sh
cd solution
```

- Definimos la config inicial
```sh
pac solution init --publisher-name empresamx --publisher-prefix cTable
```

- referencia al proyecto completo desde la carpeta build
```sh
pac solution add-reference --path ..
```

- instalacion de paquetes y generacion del zip en modo debug
- para el caso de mac se tuvo que instalar [dotnet](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
```sh
dotnet msbuild /t:clean /t:build /restore
```

- Para agregar cambios se debe modificar el Solution.xml de la carpeta solution <Version>1.1</Version> subirle el minor o major e importar nuevamente, luego hay que esperar minutos hasta que power apps refleje los cambios, o removemos el componente y lo volvemos a agregar.

# Nueva solución con template básico
```sh
pac pcf init -ns nttnamespace -n customTable --template field           
```


# Environment
```sh
SO: MAC OS
Node: 20.19.5
npm: 10.8.2
```
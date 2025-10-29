#  Laboratorio Semana 12 – Acceso a Sensores (GPS y Acelerómetro)

## 🎯 Tema
Acceso a sensores del dispositivo (GPS y Acelerómetro) con React Native (Expo Location y Expo Sensors).

---
##  📁 Estructura
```
/sensoresApp
  ├── /src
  │   ├── /components
  │   │   ├── Header.js
  │   │   ├── GpsCard.js
  │   │   └── AccelCard.js
  ├── App.js
  ├── package.json
  └── README.md
```
---
## 🧠 Descripción de la App
La aplicación solicita permiso de ubicación al usuario y accede al GPS mediante el módulo `expo-location`.
Al mismo tiempo, escucha los datos del acelerómetro usando `expo-sensors`, actualizando los valores cada 500 ms.

- Incluye las siguientes características:
- Lectura continua del GPS usando `watchPositionAsync`.
- Lectura continua del acelerómetro con `Accelerometer.addListener`.
- Detección de sacudidas cuando `|x| > 1.5` o `|y| > 1.5`.
- Visualización en tiempo real de coordenadas, velocidad y aceleración.
- Manejo de permisos denegados con mensajes claros.
- Interfaz con tarjetas separadas para cada sensor.

---
## 📸 Evidencia
**1. Solicitud de permisos de ubicación**
Captura del momento en que la app solicita acceso al GPS.

<p align="center">
  <img src="https://github.com/user-attachments/assets/00f2322e-a247-442c-958b-16533e30ab94" alt="Permiso ubicación" width="350">
</p>

**2. Lectura de GPS y Acelerómetro**
Captura mostrando la lectura de latitud, longitud, velocidad y valores del acelerómetro.

<p align="center">
  <img src="https://github.com/user-attachments/assets/5135a190-a6bb-4e4c-9e47-7cb8fd9319dd" alt="Lectura sensores 1" width="300" style="margin-right:10px;">
  <img src="https://github.com/user-attachments/assets/e6885b42-1e10-4d0a-84d5-9084ec530f11" alt="Lectura sensores 2" width="300">
</p>

---

## 🧩 Resultados
- Se obtuvo correctamente la ubicación actual en tiempo real.
- Se detectaron los valores del acelerómetro al mover el dispositivo.
- La aplicación muestra la fecha y hora de la última lectura.
  



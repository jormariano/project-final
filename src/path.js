// Archivo de configuraciones, devuelve la posicion exacta donde esta el codigo, donde esta la carpeta src

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

/* 
import {fileURLToPath} from 'url';: La función fileURLToPath se utiliza para convertir una URL de archivo 
(como la proporcionada por import.meta.url) en una ruta de archivo válida en el sistema de archivos del sistema operativo.

import {dirname} from 'path';: La función dirname se utiliza para obtener el nombre del directorio de una ruta de archivo.

const __filename = fileURLToPath(import.meta.url);: import.meta.url proporciona la URL (lugar donde esta el archivo en la compu) 
y la función fileURLToPath convierte esa URL en una ruta de archivo válida y la asigna a la variable __filename. 
Entonces, __filename contendrá la ruta del archivo actual.

export const __dirname = dirname(__filename);: Utiliza la función dirname para obtener el nombre del directorio de la ruta 
del archivo (__filename) y lo exporta como __dirname. __dirname contendrá el nombre del directorio del archivo actual.

Asi es posible usar __dirname en otros archivos del proyecto para referenciar el directorio del archivo actual de manera relativa. 
*/
